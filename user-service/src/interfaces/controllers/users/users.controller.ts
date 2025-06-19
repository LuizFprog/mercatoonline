import { Controller, Get, Param, Patch, Post, Delete, Body, ParseIntPipe } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/use-cases/create-user/create-user';
import { FindUserByIdUseCase } from '../../../application/use-cases/find-user-by-id/find-user-by-id';
import { FindByEmail } from '../../../application/use-cases/find.by.email/find.by.email';
import { UpdateUserUseCase } from '../../../application/use-cases/updat-user/updat-user';
import { DeleteUserUseCase } from '../../../application/use-cases/delete-user/delete.user';
import { CreateUserDto } from '../../dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update.user.dto/update.user.tdo'; // Você precisará criar este DTO

@Controller('users')
export class UsersController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly findbyemail: FindByEmail,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) {}

    @Get()
    findAll() {
        return '';
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) { // Usar ParseIntPipe para converter e validar o ID
        return this.findUserByIdUseCase.execute(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) { // Recebe os dados do usuário via @Body
        return this.createUserUseCase.execute();
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return '';
    }
    
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return '';
    }
}