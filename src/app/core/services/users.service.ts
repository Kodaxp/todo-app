import { Injectable } from '@angular/core';
import { UsersInterface } from '../models/users.interface';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly endpoint = `http://localhost:3000/users`;
  private _isLogged = false;
  private _loggedUser: UsersInterface = {
    id: '',
    email: '',
    password: '',
    lastname: '',
    name: ''
  };

  async getAllUsers(): Promise<UsersInterface[]> {
    return (await axios.get(this.endpoint)).data;
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const users = await this.getAllUsers();
    const findUser = users.find((user) => user.email === email);
    this.isLogged = findUser?.password === password;
    if (findUser) this.loggedUser = findUser;
    return this.isLogged;
  }

  get loggedUserId(): string {
    return this._loggedUser.id;
  }

  get loggedUserName(): string {
    return this._loggedUser.name;
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

  private set loggedUser(user: UsersInterface) {
    this._loggedUser = user;
  }

  private set isLogged(verification: boolean) {
    this._isLogged = verification;
  }
}
