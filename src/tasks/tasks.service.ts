import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';

@Injectable()
export class TasksService {

  tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto) {
    let task: Task = {
      id: uuid(),
      ...createTaskDto,
      createdAt: new Date().getTime(),
    };
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    let taskDb = this.findOne(id);
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        taskDb = {
          ...task,
          ...updateTaskDto,
          updatedAt: new Date().getTime(),
        }
        return taskDb;
      }
      return task;
    });
    return taskDb;
  }

  updateStatus(id: string, updateTaskDto: UpdateTodoStatusDto) {
    let taskDb = this.findOne(id);
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        taskDb = {
          ...task,
          status: updateTaskDto.status,
          updatedAt: new Date().getTime(),
        }
        return taskDb;
      }
      return task;
    });
    return taskDb;
  }

  remove(id: string) {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
