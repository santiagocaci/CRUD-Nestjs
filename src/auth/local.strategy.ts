import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // async validate(loginAuhtDto: LoginAuthDto) {
  //   const user = await this.authService.validateUser(loginAuhtDto);
  //   console.log('hola');
    
  //   if(!user){
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}