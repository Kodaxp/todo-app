import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersInterface } from '../../../core/models/users.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  titleFormControl = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: UsersInterface; function: string },
    public dialogRef: MatDialogRef<TaskDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
