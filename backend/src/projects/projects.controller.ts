import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@GetUser() user, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(user.id, dto);
  }

  @Get()
  findAll(@GetUser() user, @Query('page') page: string, @Query('limit') limit: string) {
    return this.projectsService.findAll(user.id, Number(page) || 1, Number(limit) || 5);
  }

  @Get(':id')
  findOne(@GetUser() user, @Param('id') id: string) {
    return this.projectsService.findOne(user.id, id);
  }

  @Patch(':id')
  update(@GetUser() user, @Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@GetUser() user, @Param('id') id: string) {
    return this.projectsService.remove(user.id, id);
  }
}
