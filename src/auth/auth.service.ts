import { HttpException, Injectable } from "@nestjs/common";
import { RegisterAuhtDto } from './dto/register-auth.dto';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async registerUser(registerAuthDto: RegisterAuhtDto) {
    const user = await this.userService.create(registerAuthDto);
    if (!user) {
      throw new HttpException('The email is already registered', 400);
    }
    return user;
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findOneByEmail(loginAuthDto.email);

    if (!user || !bcrypt.compareSync(loginAuthDto.password, user.password)) {
      throw new HttpException('User or password invalid', 400)
    }

    const payload = { id: user._id, username: user.username };

    const token = this.jwtService.sign(payload);

    const data = {
      user,
      token
    };
    return data;
  }


}