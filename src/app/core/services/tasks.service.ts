import { Injectable } from '@angular/core';
import axios from 'axios';
import { TasksInterface } from '../models/tasks.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  endpoint = `http://localhost:3000/tasks`;

  async getTaskByUser(userId: string): Promise<TasksInterface[]> {
    return (await axios.get(this.endpoint, { params: { userId: Number(userId) } })).data;
  }
}
