import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './list/task-list.component';
import { MaterialModule } from '../common/components/material/material.module';

@NgModule({
  declarations: [TaskListComponent],
  imports: [CommonModule, MaterialModule]
})
export class TaskListModule {}
