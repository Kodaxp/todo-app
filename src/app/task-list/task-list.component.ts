import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TasksInterface } from '../core/models/tasks.interface';
import { UsersService } from '../core/services/users.service';
import { TasksService } from '../core/services/tasks.service';
import { TaskDialogComponent } from '../common/components/task-dialog/task-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<TasksInterface>(true, []);

  displayedColumns: string[] = ['select', 'title', 'description', 'completed'];

  dataSource!: MatTableDataSource<TasksInterface>;
  userNameToShow: string = this.usersService.loggedUserName;

  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
    public dialog: MatDialog
  ) {
    this.setTableData().then();
  }

  async setTableData() {
    const tasksList = await this.tasksService.getTaskByUser(this.usersService.loggedUserId);
    tasksList.forEach((task) => {
      if (task.completed) {
        this.selection.select(task);
      }
    });
    this.dataSource = new MatTableDataSource(tasksList);
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewTask() {
    this.dialog.open(TaskDialogComponent, { data: { user: this.usersService.loggedUserId, function: 'add' } });
  }

  async toggleSelection(row: TasksInterface) {
    await this.tasksService.updateTask({ ...row, completed: !row.completed });
    this.selection.toggle(row);
    row.completed = !row.completed;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  async toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.dataSource.data.forEach((data) => (data.completed = false));
      await this.tasksService.updateAllTask(this.dataSource.data);
      return;
    }
    this.dataSource.data.forEach((data) => (data.completed = true));
    await this.tasksService.updateAllTask(this.dataSource.data);
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: TasksInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
