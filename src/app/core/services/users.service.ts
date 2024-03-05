import {Injectable} from '@angular/core';
import {UsersInterface} from "../models/users.interface";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly endpoint = `http://localhost:3000/users`;
  private _isLogged = false;

  async getAllUsers(): Promise<UsersInterface[]> {
    return (await axios.get(this.endpoint)).data;
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const users = await this.getAllUsers();
    const findUser = users.find((user) => user.email === email);
    this.isLogged = findUser?.password === password;
    return this.isLogged;
  }

  get isLogged() {
    return this._isLogged;
  }

  set isLogged(verification: boolean) {
    this._isLogged = verification;
  }
}
