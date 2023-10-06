import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 7);
    createUserDto['password'] = hashedPassword;
    let user = await this.userModel.create(createUserDto);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.getUserById(userId);
    const newUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto,{ new: true });
    return newUser;
  }

  async deleteUserById(userId: string): Promise<User> {
    const user = await this.getUserById(userId);
    await this.userModel.deleteOne({ _id: userId });
    return user;
  }
}
