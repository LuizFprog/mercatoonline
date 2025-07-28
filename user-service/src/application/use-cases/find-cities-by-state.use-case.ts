import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from 'src/domain/interface.repository/user.interface.repository/location.interface.repository';

@Injectable()
export class FindCitiesByStateUseCase {
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
  ) {}

  async execute(stateId: number) {
    return this.locationRepository.findCitiesByState(stateId);
  }
}