import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, Query, HttpException, HttpStatus, ParseIntPipe, Logger, DefaultValuePipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamMongoIdDto } from './dto/param-mongoid.dto';
import { ParseObjectIdPipe } from './pipes/parseObjectIdPipe';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number
  ) {
    return this.usersService.findAll(limit, skip);
  }


  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.usersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
