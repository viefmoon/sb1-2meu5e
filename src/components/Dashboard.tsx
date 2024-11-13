import React from 'react';
import ModuleSection from './ModuleSection';
import { Sensor, Reading, SensorType, Unit, ModuleType, Module } from '../types/sensors';

const modules: Module[] = [
  {
    type: ModuleType.IRRIGATION_POTS,
    title: 'Ollas de Riego',
    description: 'Monitoreo de pH, conductividad eléctrica y flujo de agua'
  },
  {
    type: ModuleType.INDOOR_MODULES,
    title: 'Módulos Interiores',
    description: 'Control de humedad y temperatura en módulos internos'
  },
  {
    type: ModuleType.GREENHOUSE,
    title: 'Invernadero',
    description: 'Condiciones ambientales del invernadero'
  },
  {
    type: ModuleType.FOLIAGE,
    title: 'Follaje',
    description: 'Monitoreo de temperatura foliar'
  }
];

const mockSensors: Sensor[] = [
  // Ollas de Riego
  {
    id: '1',
    name: 'pH Agua',
    type: SensorType.PH,
    units: Unit.PH,
    moduleType: ModuleType.IRRIGATION_POTS,
    samplingInterval: 30
  },
  {
    id: '2',
    name: 'Conductividad Eléctrica',
    type: SensorType.CONDUCTIVITY,
    units: Unit.MICROSIEMENS,
    moduleType: ModuleType.IRRIGATION_POTS,
    samplingInterval: 60
  },
  {
    id: '3',
    name: 'Flujo de Agua',
    type: SensorType.FLOW,
    units: Unit.LITERS_PER_MINUTE,
    moduleType: ModuleType.IRRIGATION_POTS,
    samplingInterval: 15
  },
  // Módulos Interiores
  {
    id: '4',
    name: 'Humedad Interior',
    type: SensorType.HUMIDITY,
    units: Unit.PERCENTAGE,
    moduleType: ModuleType.INDOOR_MODULES,
    samplingInterval: 30
  },
  {
    id: '5',
    name: 'Temperatura Interior',
    type: SensorType.TEMPERATURE,
    units: Unit.CELSIUS,
    moduleType: ModuleType.INDOOR_MODULES,
    samplingInterval: 30
  },
  // Invernadero
  {
    id: '6',
    name: 'Humedad Invernadero',
    type: SensorType.HUMIDITY,
    units: Unit.PERCENTAGE,
    moduleType: ModuleType.GREENHOUSE,
    samplingInterval: 30
  },
  {
    id: '7',
    name: 'Temperatura Invernadero',
    type: SensorType.TEMPERATURE,
    units: Unit.CELSIUS,
    moduleType: ModuleType.GREENHOUSE,
    samplingInterval: 30
  },
  // Follaje
  {
    id: '8',
    name: 'Temperatura Foliar',
    type: SensorType.LEAF_TEMPERATURE,
    units: Unit.CELSIUS,
    moduleType: ModuleType.FOLIAGE,
    samplingInterval: 60
  }
];

const mockReadings: Record<string, Reading> = {
  '1': { id: 'r1', sensorId: '1', value: 7.2, timestamp: new Date() },
  '2': { id: 'r2', sensorId: '2', value: 1250, timestamp: new Date() },
  '3': { id: 'r3', sensorId: '3', value: 45.5, timestamp: new Date() },
  '4': { id: 'r4', sensorId: '4', value: 65.8, timestamp: new Date() },
  '5': { id: 'r5', sensorId: '5', value: 24.3, timestamp: new Date() },
  '6': { id: 'r6', sensorId: '6', value: 70.5, timestamp: new Date() },
  '7': { id: 'r7', sensorId: '7', value: 26.8, timestamp: new Date() },
  '8': { id: 'r8', sensorId: '8', value: 22.4, timestamp: new Date() }
};

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Sistema de Monitoreo Agrícola</h1>
          <p className="text-gray-600 mt-2">Monitoreo en tiempo real de sensores por sección</p>
        </header>

        {modules.map((module) => (
          <ModuleSection
            key={module.type}
            module={module}
            sensors={mockSensors.filter(sensor => sensor.moduleType === module.type)}
            readings={mockReadings}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;