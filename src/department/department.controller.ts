import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UnauthorizedException,
  Request,
  Delete,
  Patch,
  Logger,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../user/auth/jwt-auth.guard';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JoiValidationPipe } from '../data.validation';
import { CreateRequestSchema } from './department.validation';

@Controller('api/department')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly userService: UserService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(CreateRequestSchema))
  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Request() req,
  ) {
    try {
      await this.checkPermission(req);
      return this.departmentService.create(createDepartmentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Request() req,
  ) {
    Logger.debug(id);
    Logger.warn(updateDepartmentDto);
    await this.checkPermission(req);
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    await this.checkPermission(req);
    return this.departmentService.remove(id);
  }

  async checkPermission(req: any) {
    const user = await this.userService.findById(req?.user?.userId);
    if (user.role != 'admin') {
      throw new UnauthorizedException("You don't have enough permission");
    }
  }
}
