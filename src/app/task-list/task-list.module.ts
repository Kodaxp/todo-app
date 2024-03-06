import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { MaterialModule } from '../common/components/material/material.module';
import { TaskDialogModule } from '../common/components/task-dialog/task-dialog.module';

@NgModule({
  declarations: [TaskListComponent],
  imports: [CommonModule, MaterialModule, TaskDialogModule]
})
export class TaskListModule {}
