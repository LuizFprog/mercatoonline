import { Injectable } from '@nestjs/common';
import { State, City } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ILocationRepository } from 'src/domain/interface.repository/user.interface.repository/location.interface.repository';

@Injectable()
export class LocationPrismaRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllStates(): Promise<State[]> {
    return this.prisma.state.findMany({
      orderBy: {
        uf: 'asc',
      },
    });
  }

  async findCitiesByState(stateId: number): Promise<City[]> {
    return this.prisma.city.findMany({
      where: { stateId },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
