export enum SensorType {
  PH = 'ph',
  CONDUCTIVITY = 'conductivity',
  FLOW = 'flow',
  HUMIDITY = 'humidity',
  TEMPERATURE = 'temperature',
  LEAF_TEMPERATURE = 'leaf_temperature'
}

export enum Unit {
  PH = 'pH',
  MICROSIEMENS = 'µS/cm',
  LITERS_PER_MINUTE = 'L/min',
  PERCENTAGE = '%',
  CELSIUS = '°C'
}

export enum ModuleType {
  IRRIGATION_POTS = 'irrigation_pots',
  INDOOR_MODULES = 'indoor_modules',
  GREENHOUSE = 'greenhouse',
  FOLIAGE = 'foliage'
}

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  units: Unit;
  moduleType: ModuleType;
  samplingInterval: number;
}

export interface Reading {
  id: string;
  sensorId: string;
  value: number;
  timestamp: Date;
}

export interface Module {
  type: ModuleType;
  title: string;
  description: string;
}