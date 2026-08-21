import { StationModule } from '../types';
import { stationsGroup1 } from './modules/foundations_operations_strategy';
import { stationsGroup2 } from './modules/growth_social_web';
import { stationsGroup3 } from './modules/pr_internal_creative';
import { stationsGroup4 } from './modules/events_capstone';

export const ALL_STATIONS: StationModule[] = [
  ...stationsGroup1,
  ...stationsGroup2,
  ...stationsGroup3,
  ...stationsGroup4,
];

export function getStationById(id: string): StationModule | undefined {
  return ALL_STATIONS.find((s) => s.id === id);
}

export function getNextStationId(currentId: string): string | undefined {
  const currentIndex = ALL_STATIONS.findIndex((s) => s.id === currentId);
  if (currentIndex >= 0 && currentIndex < ALL_STATIONS.length - 1) {
    return ALL_STATIONS[currentIndex + 1].id;
  }
  return undefined;
}
