import { dbAsync } from './index.js';

// Create tables
const createTables = async () => {
  // Drop existing tables if they exist
  await dbAsync.exec(`
    DROP TABLE IF EXISTS readings;
    DROP TABLE IF EXISTS sensors;
    DROP TABLE IF EXISTS modules;
  `);

  // Create tables in correct order
  await dbAsync.exec(`
    CREATE TABLE modules (
      type TEXT PRIMARY KEY,
      id TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE sensors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      units TEXT NOT NULL,
      module_type TEXT NOT NULL,
      sampling_interval INTEGER NOT NULL,
      FOREIGN KEY (module_type) REFERENCES modules (type)
    );

    CREATE TABLE readings (
      id TEXT PRIMARY KEY,
      sensor_id TEXT NOT NULL,
      value REAL NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sensor_id) REFERENCES sensors (id)
    );
  `);
};

// Insert initial data
const modules = [
  {
    id: '1',
    type: 'irrigation_pots',
    title: 'Ollas de Riego',
    description: 'Monitoreo de pH, conductividad eléctrica y flujo de agua'
  },
  {
    id: '2',
    type: 'indoor_modules',
    title: 'Módulos Interiores',
    description: 'Control de humedad y temperatura en módulos internos'
  },
  {
    id: '3',
    type: 'greenhouse',
    title: 'Invernadero',
    description: 'Condiciones ambientales del invernadero'
  }
];

const sensors = [
  {
    id: '1',
    name: 'pH Agua',
    type: 'ph',
    units: 'pH',
    module_type: 'irrigation_pots',
    sampling_interval: 30
  },
  {
    id: '2',
    name: 'Conductividad Eléctrica',
    type: 'conductivity',
    units: 'µS/cm',
    module_type: 'irrigation_pots',
    sampling_interval: 60
  },
  {
    id: '3',
    name: 'Flujo de Agua',
    type: 'flow',
    units: 'L/min',
    module_type: 'irrigation_pots',
    sampling_interval: 15
  }
];

const insertInitialData = async () => {
  // Insert modules first
  for (const module of modules) {
    await dbAsync.run(
      'INSERT INTO modules (id, type, title, description) VALUES (?, ?, ?, ?)',
      [module.id, module.type, module.title, module.description]
    );
  }

  // Then insert sensors
  for (const sensor of sensors) {
    await dbAsync.run(
      'INSERT INTO sensors (id, name, type, units, module_type, sampling_interval) VALUES (?, ?, ?, ?, ?, ?)',
      [sensor.id, sensor.name, sensor.type, sensor.units, sensor.module_type, sensor.sampling_interval]
    );
  }
};

// Initialize database
const init = async () => {
  try {
    await createTables();
    await insertInitialData();
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

init();