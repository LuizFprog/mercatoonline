import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from 'src/domain/interface.repository/user.interface.repository/location.interface.repository';

@Injectable()
export class FindAllStatesUseCase {
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
  ) {}

  async execute() {
    return this.locationRepository.findAllStates();
  }
}