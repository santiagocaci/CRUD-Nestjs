import { Body, Controller, Post } from "@nestjs/common";
import { RegisterAuhtDto } from './dto/register-auth.dto';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterAuhtDto) {
    return this.authService.registerUser(registerUserDto);
  }
}