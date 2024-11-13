import { SensorType, Unit, ModuleType } from '../types/sensors.js';

export const sensors = [
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
  }
];

export const modules = [
  {
    id: '1',
    type: ModuleType.IRRIGATION_POTS,
    title: 'Ollas de Riego',
    description: 'Monitoreo de pH, conductividad eléctrica y flujo de agua'
  },
  {
    id: '2',
    type: ModuleType.INDOOR_MODULES,
    title: 'Módulos Interiores',
    description: 'Control de humedad y temperatura en módulos internos'
  },
  {
    id: '3',
    type: ModuleType.GREENHOUSE,
    title: 'Invernadero',
    description: 'Condiciones ambientales del invernadero'
  }
];