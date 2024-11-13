import React from 'react';
import SensorCard from './SensorCard';
import { Module, Sensor, Reading } from '../types/sensors';

interface ModuleSectionProps {
  module: Module;
  sensors: Sensor[];
  readings: Record<string, Reading>;
}

const ModuleSection: React.FC<ModuleSectionProps> = ({ module, sensors, readings }) => {
  return (
    <section className="mb-8">
      <div className="border-l-4 border-blue-500 pl-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{module.title}</h2>
        <p className="text-gray-600 mt-1">{module.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.id}
            sensor={sensor}
            latestReading={readings[sensor.id]}
          />
        ))}
      </div>
    </section>
  );
};

export default ModuleSection;