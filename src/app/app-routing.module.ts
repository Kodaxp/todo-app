import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import {TaskListComponent} from "./task-list/list/task-list.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
