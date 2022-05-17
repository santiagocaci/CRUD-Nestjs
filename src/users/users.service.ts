import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { ParamMongoId } from './dto/param-mongoid.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User } from './schema/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userModel.findOne({email: createUserDto.email});
    if (userExist) {
      throw new BadRequestException('The email is already registered');
    }
    const createdUser =  new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(limit: number = 0, skip: number = 0) {
    return this.userModel.find().skip(skip).limit(limit);
  }

  async findOne(id: ParamMongoId): Promise<User | HttpException> {
    const foundUser = await this.userModel.findById(id.id);
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string) {
    const foundUser = await this.userModel.findByIdAndDelete(id);
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundUser;
  }
}
