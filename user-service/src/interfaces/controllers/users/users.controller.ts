// src/interfaces/controllers/users/users.controller.ts

import { Controller, Get, Param, Patch, Post, Delete, Body, ParseIntPipe } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user/create-user';
import { FindUserByIdUseCase } from 'src/application/use-cases/find-user-by-id/find-user-by-id';
import { UpdateUserUseCase } from 'src/application/use-cases/update-user/update-user';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user/delete.user';
import { FindUserAll } from 'src/application/use-cases/find.all.user/find.all.user';
import { FindByEmail } from 'src/application/use-cases/find.by.email/find.by.email'
import { CreateUserDto } from 'src/interfaces/dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from 'src/interfaces/dto/update.user.dto/update.user.tdo';

@Controller('users')
export class UsersController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly findByEmail: FindByEmail,
        private readonly findAllUser: FindUserAll,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) {}

    @Get()
    findAll() {
        return this.findAllUser.execute();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.findUserByIdUseCase.execute(id);
    }

    @Get(':email')
    findEmail(@Param('email') email: string) {
        return this.findByEmail.execute(email);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.updateUserUseCase.execute(id, updateUserDto);
    }
    
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.deleteUserUseCase.execute(id);
    }
}