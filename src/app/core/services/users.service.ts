import {Injectable} from '@angular/core';
import {UsersInterface} from "../models/users.interface";
import axios from "axios";

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

  get loggedUser(): UsersInterface {
    return this._loggedUser;
  }

  set loggedUser(user: UsersInterface) {
    this._loggedUser = user;
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

  set isLogged(verification: boolean) {
    this._isLogged = verification;
  }
}
