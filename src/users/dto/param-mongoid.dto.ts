import { IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";

export class ParamMongoIdDto{

  @IsString()
  id: string
}