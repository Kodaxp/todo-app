import { Component } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  async login() {
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) return;

    const validate = await this.usersService.validateUser(this.emailFormControl.value, this.passwordFormControl.value);
    if (validate) {
      await this.router.navigate(['/list']);
    }
  }
}
