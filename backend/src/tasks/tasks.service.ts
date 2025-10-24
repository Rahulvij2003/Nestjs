import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../projects/schemas/project.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(userId: string, dto: CreateTaskDto) {
    const project = await this.projectModel.findOne({ _id: dto.project, user: userId });
    if (!project) throw new NotFoundException('Project not found');

    return this.taskModel.create({ ...dto, project: project._id });
  }

  async findAll(userId: string, projectId?: string, status?: string, page = 1, limit = 5) {
    const skip = (page - 1) * limit;
    const filter: any = {};
    if (projectId) filter.project = projectId;
    if (status) filter.status = status;

    const userProjects = await this.projectModel.find({ user: userId }).select('_id');
    filter.project = { $in: userProjects.map(p => p._id) };
    if (projectId) filter.project = projectId;

    const [tasks, total] = await Promise.all([
      this.taskModel.find(filter).skip(skip).limit(limit),
      this.taskModel.countDocuments(filter),
    ]);

    return { tasks, total, page, pages: Math.ceil(total / limit) };
  }

  async findOne(userId: string, id: string) {
    const task = await this.taskModel.findById(id).populate('project');
    if (!task || (task.project as any).user.toString() !== userId) throw new NotFoundException('Task not found');
    return task;
  }

  async update(userId: string, id: string, dto: UpdateTaskDto) {
    const task = await this.taskModel.findById(id).populate('project');
    if (!task || (task.project as any).user.toString() !== userId) throw new NotFoundException('Task not found');
    Object.assign(task, dto);
    return task.save();
  }

  async remove(userId: string, id: string) {
    const task = await this.taskModel.findById(id).populate('project');
    if (!task || (task.project as any).user.toString() !== userId) throw new NotFoundException('Task not found');
    return task.deleteOne();
  }
}
