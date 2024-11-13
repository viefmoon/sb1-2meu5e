import express from 'express';
import { dbAsync } from '../db/index.js';

const router = express.Router();

// Get all modules
router.get('/', async (req, res) => {
  try {
    const modules = await dbAsync.all('SELECT * FROM modules');
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get module by ID
router.get('/:id', async (req, res) => {
  try {
    const module = await dbAsync.get('SELECT * FROM modules WHERE id = ?', [req.params.id]);
    
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    
    const sensors = await dbAsync.all('SELECT * FROM sensors WHERE module_type = ?', [module.type]);
    
    res.json({
      ...module,
      sensors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get module sensors with latest readings
router.get('/:id/sensors', async (req, res) => {
  try {
    const module = await dbAsync.get('SELECT * FROM modules WHERE id = ?', [req.params.id]);
    
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    
    const sensors = await dbAsync.all(`
      SELECT s.*, r.value as latest_value, r.timestamp as latest_reading_time
      FROM sensors s
      LEFT JOIN (
        SELECT sensor_id, value, timestamp
        FROM readings r1
        WHERE (
          SELECT COUNT(*)
          FROM readings r2
          WHERE r2.sensor_id = r1.sensor_id
            AND r2.timestamp > r1.timestamp
        ) < 1
      ) r ON s.id = r.sensor_id
      WHERE s.module_type = ?
    `, [module.type]);
    
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;