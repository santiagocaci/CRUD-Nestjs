import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  username: string;

}
