import { TasksService } from './tasks.service';
import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import axios from 'axios';

describe('Task Service Test', () => {
  let tasksService: TasksService;
  const responseMock = [{ id: '1', title: 'Test', description: 'Testing', completed: false, userId: 1 }];

  let usersServiceMock = {
    loggedUserId: '1'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UsersService, useValue: usersServiceMock }, TasksService]
    });

    tasksService = TestBed.inject(TasksService);
  });

  it('should call getTaskByUser method and return task by user id', async () => {
    const spyAxios = spyOn(axios, 'get').and.resolveTo({ data: responseMock });
    const result = await tasksService.getTaskByUser('1');
    expect(result).toEqual(responseMock);
    expect(spyAxios).toHaveBeenCalledWith(`http://localhost:3000/tasks`, { params: { userId: 1 } });
  });

  it('should call updateTask method and return updated task', async () => {
    const spyAxios = spyOn(axios, 'put').and.resolveTo({ data: responseMock });
    const result = await tasksService.updateTask(responseMock[0]);
    expect(result).toEqual(responseMock);
    expect(spyAxios).toHaveBeenCalledWith(`http://localhost:3000/tasks/1`, responseMock[0]);
  });

  it('should call addNewTask method and return new task', async () => {
    const spyAxios = spyOn(axios, 'post').and.resolveTo({ data: responseMock });
    const result = await tasksService.addNewTask('Title', 'Desc');
    expect(result).toEqual(responseMock);
    expect(spyAxios).toHaveBeenCalledWith(`http://localhost:3000/tasks`, { title: 'Title', description: 'Desc', completed: false, userId: '1' });
  });

  it('should call deleteTask method and return deleted task', async () => {
    const spyAxios = spyOn(axios, 'delete').and.resolveTo({ data: responseMock });
    const result = await tasksService.deleteTask('1234');
    expect(result).toEqual(responseMock);
    expect(spyAxios).toHaveBeenCalledWith(`http://localhost:3000/tasks/1234`);
  });
});
