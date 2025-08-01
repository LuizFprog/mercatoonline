import { Controller, Get, Param, Patch, Post, Delete, Body, ParseIntPipe } from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/create-user';
import { FindUserById } from 'src/application/use-cases/find-user-by-id';
import { UpdateUserUseCase } from 'src/application/use-cases/update-user';
import { DeleteUser } from 'src/application/use-cases/delete.user';
import { FindUserAll } from 'src/application/use-cases/find.all.user';
import { FindByEmail } from 'src/application/use-cases/find.by.email'
import { FindByCPF } from 'src/application/use-cases/find.by.cpf';
import { FindByPhone } from 'src/application/use-cases/find.by.phone';
import { CreateUserDto } from 'src/interfaces/dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from 'src/interfaces/dto/update.user.dto/update.user.tdo';

@Controller('users')
export class UsersController {
    constructor(
        private readonly createUser_: CreateUser,
        private readonly findUserById: FindUserById,
        private readonly findByEmail: FindByEmail,
        private readonly findAllUser: FindUserAll,
        private readonly updateUser_: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUser,
        private readonly findByCPF: FindByCPF,
        private readonly findByPhone: FindByPhone,
    ) {}

    @Get()
    findAll() {
        return this.findAllUser.execute();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.findUserById.execute(id);
    }

    @Get('email/:email')
    findEmail(@Param('email') email: string) {
        return this.findByEmail.execute(email);
    }

    @Get('cpf/:cpf')
    findCPF(@Param('cpf') cpf: string) {
        return this.findByCPF.execute(cpf);
    }

    @Get('phone/:phone')
    findPhone(@Param('phone') phone: string) {
        return this.findByPhone.execute(phone);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.createUser_.execute(createUserDto);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.updateUser_.execute(id, updateUserDto);
    }
    
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.deleteUserUseCase.execute(id);
    }
}