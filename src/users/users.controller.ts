import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('check', createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Patch(':userId')
  updateUserById(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserById(userId, updateUserDto);
  }

  @Delete(':userId')
  deleteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
