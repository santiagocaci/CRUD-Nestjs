import { IsNotEmpty, IsEmail, MaxLength, MinLength } from "class-validator";

export class RegisterAuhtDto {

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