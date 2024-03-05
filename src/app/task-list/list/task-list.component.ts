import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { TasksService } from '../../core/services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
  ) {}

  async ngOnInit() {
    const tasksList = await this.tasksService.getTaskByUser(this.usersService.loggedUser.id);
    console.log(tasksList);
  }
}
