import React from 'react';
import { LineChart, Activity, Droplets, Waves, Droplet, Thermometer } from 'lucide-react';
import { Sensor, Reading, SensorType } from '../types/sensors';

interface SensorCardProps {
  sensor: Sensor;
  latestReading?: Reading;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor, latestReading }) => {
  const getIcon = () => {
    switch (sensor.type) {
      case SensorType.PH:
        return <Droplets className="w-6 h-6 text-blue-500" />;
      case SensorType.CONDUCTIVITY:
        return <Waves className="w-6 h-6 text-green-500" />;
      case SensorType.FLOW:
        return <Activity className="w-6 h-6 text-purple-500" />;
      case SensorType.HUMIDITY:
        return <Droplet className="w-6 h-6 text-cyan-500" />;
      case SensorType.TEMPERATURE:
      case SensorType.LEAF_TEMPERATURE:
        return <Thermometer className="w-6 h-6 text-red-500" />;
      default:
        return <LineChart className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getIcon()}
          <h3 className="text-lg font-semibold text-gray-800">{sensor.name}</h3>
        </div>
        <span className="text-sm text-gray-500">
          Intervalo: {sensor.samplingInterval}s
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-baseline">
          <span className="text-3xl font-bold">
            {latestReading ? latestReading.value.toFixed(2) : '--'}
          </span>
          <span className="text-sm text-gray-500">{sensor.units}</span>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          Última actualización: {latestReading 
            ? new Date(latestReading.timestamp).toLocaleTimeString()
            : 'Sin datos'}
        </div>
      </div>
    </div>
  );
};

export default SensorCard;