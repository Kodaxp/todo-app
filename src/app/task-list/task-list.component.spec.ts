import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { MaterialModule } from '../common/components/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { TasksInterface } from '../core/models/tasks.interface';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TaskDialogComponent } from '../common/components/task-dialog/task-dialog.component';
import { TasksService } from '../core/services/tasks.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let matDialog: MatDialog;
  let tasksService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent, TaskDialogComponent],
      imports: [MaterialModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({ afterClosed: () => of({}) })
          }
        },
        TasksService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    matDialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter data when applyFilter is called', () => {
    component.dataSource = new MatTableDataSource<TasksInterface>([]);

    const event = {
      target: {
        value: 'test'
      }
    };

    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('test');
  });

  it('addNewTask should open dialog and call updateTaskList', () => {
    const dialogSpy = spyOn(matDialog, 'open').and.callThrough();
    component.addNewTask();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('updateTask should open dialog with data and call updateTaskList', () => {
    const task: TasksInterface = { id: '1', description: 'Descripción para Pruebas', title: 'Titulo para Pruebas', completed: false, userId: 1 };
    const dialogSpy = spyOn(matDialog, 'open').and.callThrough();
    component.updateTask(task);
    expect(dialogSpy).toHaveBeenCalledWith(TaskDialogComponent, { data: { task, function: 'edit' } });
  });

  it('deleteTask should call TasksService.deleteTask and component.updateTaskList', () => {
    const spyTaskService = spyOn(tasksService, 'deleteTask').and.returnValue(Promise.resolve());
    component.deleteTask('1');
    expect(spyTaskService).toHaveBeenCalled();
  });

  it('should ', () => {
    const spyTaskService = spyOn(tasksService, 'updateTask').and.returnValue(Promise.resolve());
    const task: TasksInterface = { id: '1', description: 'Descripción para Pruebas', title: 'Titulo para Pruebas', completed: false, userId: 1 };
    component.toggleSelection(task);
    expect(spyTaskService).toHaveBeenCalled();
  });
});
