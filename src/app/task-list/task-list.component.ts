import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class TaskListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  selection = new SelectionModel<TasksInterface>(true, []);

  displayedColumns: string[] = ['select', 'title', 'description', 'completed', 'actions'];
  dataSource!: MatTableDataSource<TasksInterface>;
  userNameToShow: string = this.usersService.loggedUserName;
  showTable = false;

  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.setTableData().then(() => (this.showTable = true));
  }

  async setTableData() {
    await this.tasksService.getTaskByUser(this.usersService.loggedUserId);
    this.updateTaskList();
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, { data: { function: 'add' } });
    dialogRef.afterClosed().subscribe(() => {
      this.updateTaskList();
    });
  }

  updateTask(task: TasksInterface) {
    const dialogRef = this.dialog.open(TaskDialogComponent, { data: { task, function: 'edit' } });
    dialogRef.afterClosed().subscribe(() => {
      this.updateTaskList();
    });
  }

  async deleteTask(id: string) {
    await this.tasksService.deleteTask(id);
    this.updateTaskList();
  }

  async toggleSelection(row: TasksInterface) {
    await this.tasksService.updateTask({ ...row, completed: !row.completed });
    this.selection.toggle(row);
    row.completed = !row.completed;
  }

  private updateTaskList() {
    this.selection.select(...this.tasksService.taskList.filter((a) => a.completed));
    this.dataSource = new MatTableDataSource(this.tasksService.taskList);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }
}
