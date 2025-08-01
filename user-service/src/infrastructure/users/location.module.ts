import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocationController } from 'src/interfaces/controllers/users/location.controller';
import { FindAllStatesUseCase } from 'src/application/use-cases/find-all-states.use-case';
import { FindCitiesByStateUseCase } from 'src/application/use-cases/find-cities-by-state.use-case';
import { ILocationRepository } from 'src/domain/interface.repository/user.interface.repository/location.interface.repository';
import { LocationPrismaRepository } from '../database/repositories/user-prisma.repository/location.prisma.repository.service';
import { FindCityByIdUseCase } from 'src/application/use-cases/find-city-by-id.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [LocationController],
  providers: [
    FindAllStatesUseCase,
    FindCitiesByStateUseCase,
    FindCityByIdUseCase,
    {
      provide: ILocationRepository,
      useClass: LocationPrismaRepository,
    },
  ],
})
export class LocationModule {}