import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from "../services/users.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(): boolean {
    if (this.usersService.isLogged) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
