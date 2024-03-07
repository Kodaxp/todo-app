import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../core/services/users.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../common/components/material/material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usersService: UsersService;
  let router: Router;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['validateUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule],
      declarations: [LoginComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form controls should be invalid on init', () => {
    expect(component.emailFormControl.valid).toBeFalse();
    expect(component.passwordFormControl.valid).toBeFalse();
  });

  it('should login and navigate after successful validateUser', async () => {
    usersService.validateUser = jasmine.createSpy().and.returnValue(true);

    await component.login();

    expect(usersService.validateUser).toHaveBeenCalledWith('juan@email.com', '123456');
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should not navigate on unsuccessful validateUser', async () => {
    usersService.validateUser = jasmine.createSpy().and.returnValue(false);

    await component.login();

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
