import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DepartmentComponent } from './department/department.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { LeaveComponent } from './leave/leave.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveDisplayComponent } from './leave-display/leave-display.component';
import { PerformancePostComponent } from './performance-post/performance-post.component';
import { ViewPerformanceComponent } from './view-performance/view-performance.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'empdetails', component: EmployeeListComponent },
  { path: 'edit/:username', component: EditEmployeeComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'create-department', component: CreateDepartmentComponent },
  { path: 'leave-admin', component: LeaveComponent },
  { path: 'leave-request', component: LeaveRequestComponent },
  { path: 'leave-display', component: LeaveDisplayComponent },
  { path: 'view-performance/:username', component: ViewPerformanceComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'editperformance/:username', component: PerformancePostComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
