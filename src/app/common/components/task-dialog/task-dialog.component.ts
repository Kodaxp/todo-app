import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersInterface } from '../../../core/models/users.interface';
import { FormControl, Validators } from '@angular/forms';
import { TasksService } from '../../../core/services/tasks.service';
import { TasksInterface } from '../../../core/models/tasks.interface';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  titleFormControl: FormControl = new FormControl('', [Validators.required]);
  descriptionFormControl: FormControl = new FormControl('', [Validators.required]);

  dialogTitle = this.data.function === 'add' ? 'Agregar' : 'Editar';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: TasksInterface; function: string },
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private tasksService: TasksService
  ) {
    if (this.data.function === 'edit') {
      this.titleFormControl.setValue(this.data.task.title);
      this.descriptionFormControl.setValue(this.data.task.description);
    }
  }

  async save() {
    if (this.titleFormControl.invalid || this.descriptionFormControl.invalid) return;

    if (this.data.function === 'add') {
      await this.tasksService.addNewTask(this.titleFormControl.value, this.descriptionFormControl.value);
    }

    if (this.data.function === 'edit') {
      await this.tasksService.updateTask({ ...this.data.task, title: this.titleFormControl.value, description: this.descriptionFormControl.value });
    }

    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
