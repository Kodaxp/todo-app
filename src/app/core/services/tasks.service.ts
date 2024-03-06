import { Injectable } from '@angular/core';
import axios from 'axios';
import { TasksInterface } from '../models/tasks.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  endpoint = `http://localhost:3000/tasks`;
  private _taskList: TasksInterface[] = [];

  constructor(private usersService: UsersService) {}

  async getTaskByUser(userId: string): Promise<TasksInterface[]> {
    this._taskList = (await axios.get(this.endpoint, { params: { userId: Number(userId) } })).data;
    return this._taskList;
  }

  async updateTask(task: TasksInterface): Promise<any> {
    const updateTask = (await axios.put(`${this.endpoint}/${task.id}`, task)).data;
    this._taskList = this._taskList.map((taskList) => (taskList.id === task.id ? task : taskList));
    return updateTask;
  }

  async addNewTask(title: string, description: string): Promise<any> {
    const task = {
      title,
      description,
      completed: false,
      userId: this.usersService.loggedUserId
    };
    const newTask = (await axios.post(this.endpoint, task)).data;
    this._taskList = [...this._taskList, newTask];
    return newTask;
  }

  async deleteTask(taskId: string) {
    const deletedTask = (await axios.delete(`${this.endpoint}/${taskId}`)).data;
    this._taskList = this._taskList.filter((task) => task.id !== taskId);
    return deletedTask;
  }

  get taskList() {
    return this._taskList;
  }
}
