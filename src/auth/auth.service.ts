import { Injectable } from "@nestjs/common";
import { RegisterAuhtDto } from './dto/register-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService{
  constructor(
    private userService: UsersService
  ) { }

  async registerUser(registerAuthDto: RegisterAuhtDto) {
    return this.userService.create(registerAuthDto);
  }
}