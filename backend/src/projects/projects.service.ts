import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(userId: string, dto: CreateProjectDto) {
    return this.projectModel.create({ ...dto, user: userId });
  }

  async findAll(userId: string, page = 1, limit = 5) {
    const skip = (page - 1) * limit;
    const [projects, total] = await Promise.all([
      this.projectModel.find({ user: userId }).skip(skip).limit(limit),
      this.projectModel.countDocuments({ user: userId }),
    ]);
    return { projects, total, page, pages: Math.ceil(total / limit) };
  }

  async findOne(userId: string, id: string) {
    const project = await this.projectModel.findOne({ _id: id, user: userId });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(userId: string, id: string, dto: UpdateProjectDto) {
    const project = await this.projectModel.findOneAndUpdate({ _id: id, user: userId }, dto, { new: true });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async remove(userId: string, id: string) {
    const project = await this.projectModel.findOneAndDelete({ _id: id, user: userId });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
