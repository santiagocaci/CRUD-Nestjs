import { RegisterAuhtDto } from './register-auth.dto';
import { OmitType } from '@nestjs/mapped-types';

export class LoginAuthDto extends OmitType(RegisterAuhtDto, ['username']) { }