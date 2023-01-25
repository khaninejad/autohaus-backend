import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from '..//user/auth/jwt-auth.guard';
import { UserService } from '../user/user.service';

@Controller('api/employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @Request() req) {
    await this.checkPermission(req);
    return this.employeeService.create(createEmployeeDto);
  }  

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Request() req,
  ) {
    await this.checkPermission(req);
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    await this.checkPermission(req);
    return this.employeeService.remove(id);
  }

  private async checkPermission(req: any) {
    const user = await this.userService.findById(req.user.userId);
    if (user.role != 'admin') {
      throw new UnauthorizedException("You don't have enough permission");
    }
  }
}
