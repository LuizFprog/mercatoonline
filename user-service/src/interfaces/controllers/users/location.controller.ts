import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindAllStatesUseCase } from 'src/application/use-cases/find-all-states.use-case';
import { FindCitiesByStateUseCase } from 'src/application/use-cases/find-cities-by-state.use-case';
import { FindCityByIdUseCase } from 'src/application/use-cases/find-city-by-id.use-case';

@Controller()
export class LocationController {
  constructor(
    private readonly findAllStatesUseCase: FindAllStatesUseCase,
    private readonly findCitiesByStateUseCase: FindCitiesByStateUseCase,
    private readonly findCityByIdUseCase: FindCityByIdUseCase,
  ) {}

  @Get('states')
  findAllStates() {
    return this.findAllStatesUseCase.execute();
  }

  @Get('states/:stateId/cities')
  findCitiesByState(@Param('stateId', ParseIntPipe) stateId: number) {
    return this.findCitiesByStateUseCase.execute(stateId);
  }

  @Get('cities/:cityId')
  findCityById(@Param('cityId', ParseIntPipe) cityId: number) {
    return this.findCityByIdUseCase.execute(cityId);
  }
}
