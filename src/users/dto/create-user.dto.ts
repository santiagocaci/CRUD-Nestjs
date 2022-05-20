import { Transform } from "class-transformer";
import { IsEmail, IsLowercase, IsNotEmpty, MaxLength, MinLength, NotContains } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(6)
  @NotContains(' ', { message: 'the password must not have spaces' })
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  @NotContains(' ', { message: 'the username must not have spaces' })
  username: string;

}
