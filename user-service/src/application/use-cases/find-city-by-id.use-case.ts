import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ILocationRepository } from 'src/domain/interface.repository/user.interface.repository/location.interface.repository';

@Injectable()
export class FindCityByIdUseCase {
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
  ) {}

  async execute(cityId: number) {
    const city = await this.locationRepository.findCityById(cityId);
    if (!city) {
      throw new NotFoundException(`Cidade com ID ${cityId} não encontrada.`);
    }
    return city;
  }
}
