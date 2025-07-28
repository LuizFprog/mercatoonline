import { Controller, Param, ParseIntPipe, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { CreateStoreDto } from 'src/interfaces/dto/create.store.dto';
import { UpdateStoreDTO } from 'src/interfaces/dto/update.store.dto';
import { CreateStoreUseCase } from 'src/application/use-cases/create-store.service';
import { DeleteStoreService } from 'src/application/use-cases/delete-store.service';
import { FindByCNPJStoreService } from 'src/application/use-cases/find-store-by-cnpj.service';
import { FindByIDStoreService } from 'src/application/use-cases/find-store-by-id.service';
import { FindByEMAILStoreService } from 'src/application/use-cases/find-store-by-email';
import { FindByNameStoreService } from 'src/application/use-cases/find-store-by-name.service';
import { UpdateStoreService } from 'src/application/use-cases/update-store.service';
import { FindByAllStoreService } from 'src/application/use-cases/find-store-by-all';

@Controller('stores')
export class StoresController {
  constructor(
    private create: CreateStoreUseCase,
    private update: UpdateStoreService,
    private findByID: FindByIDStoreService,
    private findByName: FindByNameStoreService,
    private findByCNPJ: FindByCNPJStoreService,
    private del: DeleteStoreService,
    private findAll: FindByAllStoreService,
    private findyEmail: FindByEMAILStoreService,
  ) {}

  @Get()
  findByAll() {
    return this.findAll.execute();
  }

  @Get(':id')
  findbyid(@Param('id', ParseIntPipe) id: number) {
    return this.findByID.execute(id);
  }

  @Post()
  createStore(@Body() body: CreateStoreDto) {
    return this.create.execute(body);
  }

  @Patch(':id')
  updateStore(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateStoreDTO) {
    return this.update.execute(id, body);
  }

  @Get('cnpj/:cnpj')
  findbycnpj(@Param('cnpj') cnpj: string) {
    return this.findByCNPJ.execute(cnpj);
  }

  @Get('email/:email')
  findbyemail(@Param('email') email: string) {
    return this.findyEmail.execute(email);
  }

  @Get('name/:name')
  findbyname(@Param('name') name: string) {
    return this.findByName.execute(name);
  }

  @Delete(':id')
  DeleteStoreService(@Param('id', ParseIntPipe) id: number) {
    return this.del.execute(id);
  }
}