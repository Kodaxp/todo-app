import { Injectable } from '@angular/core';
import axios from 'axios';
import { TasksInterface } from '../models/tasks.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  endpoint = `http://localhost:3000/tasks`;

  async getTaskByUser(userId: string): Promise<TasksInterface[]> {
    return (await axios.get(this.endpoint, { params: { userId: Number(userId) } })).data;
  }

  async updateTask(task: TasksInterface): Promise<any> {
    return (await axios.put(`${this.endpoint}/${task.id}`, task)).data;
  }

  async updateAllTask(tasks: TasksInterface[]): Promise<any> {
    tasks.forEach((task) => {
      axios.put(`${this.endpoint}/${task.id}`, task);
    });
  }
}
