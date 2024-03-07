import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import axios from 'axios';

describe('Users Service Test', () => {
  let usersService: UsersService;
  const responseMock = [
    {
      id: '1',
      name: 'Juan',
      lastname: 'Pérez',
      email: 'juan@email.com',
      password: '123456'
    },
    {
      id: '2',
      name: 'María',
      lastname: 'Gómez',
      email: 'maria@email.com',
      password: '123456'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService]
    });

    usersService = TestBed.inject(UsersService);
  });

  it('should call getAllUsers and get users', async () => {
    const spyAxios = spyOn(axios, 'get').and.resolveTo({ data: responseMock });
    const result = await usersService.getAllUsers();
    expect(result).toEqual(responseMock);
    expect(spyAxios).toHaveBeenCalledWith(`http://localhost:3000/users`);
  });

  it('should call getTaskByUser method and return task by user id', async () => {
    const spyAxios = spyOn(axios, 'get').and.resolveTo({ data: responseMock });
    const result = await usersService.validateUser('juan@email.com', '123456');
    expect(result).toBeTruthy();
    expect(spyAxios).toHaveBeenCalledWith(`http://localhost:3000/users`);
  });

  it('should call getTaskByUser method and return task by user id', async () => {
    const spyAxios = spyOn(axios, 'get').and.resolveTo({ data: responseMock });
    const result = await usersService.validateUser('juan@email.coma', '123456');
    expect(result).toBeFalse();
    expect(spyAxios).toHaveBeenCalledWith(`http://localhost:3000/users`);
  });
});
