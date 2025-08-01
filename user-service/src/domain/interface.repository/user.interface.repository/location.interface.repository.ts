import { State, City } from '@prisma/client';

export const ILocationRepository = Symbol('ILocationRepository');

export interface ILocationRepository {
  findAllStates(): Promise<State[]>;
  findCitiesByState(stateId: number): Promise<City[]>;
  findCityById(cityId: number): Promise<(City & { state: State }) | null>; 
}