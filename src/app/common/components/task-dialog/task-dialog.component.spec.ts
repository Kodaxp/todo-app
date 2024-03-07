import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';
import { MaterialModule } from '../material/material.module';
import { TasksService } from '../../../core/services/tasks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    const tasksServiceSpy = jasmine.createSpyObj('TasksService', ['addNewTask', 'updateTask']);
    const dialogRefSpyObj = jasmine.createSpyObj({ close: null });

    await TestBed.configureTestingModule({
      declarations: [TaskDialogComponent],
      imports: [MaterialModule, ReactiveFormsModule],
      providers: [
        { provide: TasksService, useValue: tasksServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: { task: { title: 'test', description: 'test' }, function: 'add' } },
        { provide: MatDialogRef, useValue: dialogRefSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDialogComponent);
    tasksService = TestBed.inject(TasksService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addNewTask method when function is add and form fields are valid', async () => {
    component.titleFormControl.setValue('Titulo para Pruebas');
    component.descriptionFormControl.setValue('Descripción para Pruebas');
    component.data.function = 'add';
    tasksService.addNewTask = jasmine.createSpy().and.returnValue(Promise.resolve(true));

    await component.save();

    expect(tasksService.addNewTask).toHaveBeenCalledWith('Titulo para Pruebas', 'Descripción para Pruebas');
  });

  it('should not call any tasksService methods when form fields are invalid', () => {
    component.titleFormControl.setValue('');
    component.descriptionFormControl.setValue('');
    component.data.function = 'add';

    component.save();

    expect(tasksService.addNewTask).not.toHaveBeenCalled();
    expect(tasksService.updateTask).not.toHaveBeenCalled();
  });
});
