import express from 'express';
import { dbAsync } from '../db/index.js';

const router = express.Router();

// Get all sensors
router.get('/', async (req, res) => {
  try {
    const sensors = await dbAsync.all('SELECT * FROM sensors');
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sensor by ID
router.get('/:id', async (req, res) => {
  try {
    const sensor = await dbAsync.get('SELECT * FROM sensors WHERE id = ?', [req.params.id]);
    
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor not found' });
    }
    
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sensor readings
router.get('/:id/readings', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    const readings = await dbAsync.all(`
      SELECT * FROM readings 
      WHERE sensor_id = ? 
      ORDER BY timestamp DESC 
      LIMIT ? OFFSET ?
    `, [req.params.id, limit, offset]);
    
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new sensor reading
router.post('/:id/readings', async (req, res) => {
  try {
    const { value } = req.body;
    const sensorId = req.params.id;
    
    const sensor = await dbAsync.get('SELECT * FROM sensors WHERE id = ?', [sensorId]);
    
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor not found' });
    }
    
    if (typeof value !== 'number') {
      return res.status(400).json({ error: 'Invalid reading value' });
    }

    const readingId = Date.now().toString();
    
    await dbAsync.run(`
      INSERT INTO readings (id, sensor_id, value)
      VALUES (?, ?, ?)
    `, [readingId, sensorId, value]);
    
    const reading = await dbAsync.get('SELECT * FROM readings WHERE id = ?', [readingId]);
    
    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;