import { Body, Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { RegisterAuhtDto } from './dto/register-auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from "@nestjs/passport";
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './JwtAuth.guard';




@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterAuhtDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.loginUser(loginAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(){
    return 'hi profile';
  }
}