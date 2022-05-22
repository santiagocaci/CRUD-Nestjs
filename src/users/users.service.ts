import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userModel.findOne({ email: createUserDto.email });
    if (userExist) {
      // throw new BadRequestException('The email is already registered');
      return null;
    }
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(limit: number = 0, skip: number = 0) {
    return this.userModel.find().skip(skip).limit(limit);
  }

  async findOneByMongoId(paramMongoId: string) {
    const foundUser = await this.userModel.findById(paramMongoId);
    
    if (!foundUser) {
      return null;
      // throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundUser;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return null;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const [user, userWhitEmail] = await Promise.all([
      this.userModel.findById(id),
      this.userModel.findOne({ email: updateUserDto.email })
    ]);

    if (!user) {
      // throw new BadRequestException('User not found');
      return null;
    }

    if (userWhitEmail && !user._id.equals(userWhitEmail._id)) {
      // throw new BadRequestException(`Email: ${updateUserDto.email} is already registered`);
      return null;
    }

    await user.updateOne(updateUserDto);
    await user.save();

    return user;

  }

  async remove(id: string) {
    const foundUser = await this.userModel.findByIdAndDelete(id);
    if (!foundUser) {
      // throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return null;
    }
    return foundUser;
  }
}

