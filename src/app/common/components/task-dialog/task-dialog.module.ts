import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDialogComponent } from './task-dialog.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule]
})
export class TaskDialogModule {}
