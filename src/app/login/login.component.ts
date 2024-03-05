import { Component } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  async login() {
    const validate = await this.usersService.validateUser('juan@email.com', '123456');

    if (validate) {
      await this.router.navigate(['/list']);
    }
  }
}
