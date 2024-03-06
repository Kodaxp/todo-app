import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { TasksService } from '../../core/services/tasks.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TasksInterface } from '../../core/models/tasks.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['title', 'description', 'completed'];
  dataSource!: MatTableDataSource<TasksInterface>;
  showTable = false;
  userNameToShow: string;

  constructor(
    private usersService: UsersService,
    private tasksService: TasksService
  ) {
    this.userNameToShow = this.usersService.loggedUser.name;
    this.setTableData().then(() => (this.showTable = true));
  }

  async setTableData() {
    const tasksList = await this.tasksService.getTaskByUser(this.usersService.loggedUser.id);
    this.dataSource = new MatTableDataSource(tasksList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
