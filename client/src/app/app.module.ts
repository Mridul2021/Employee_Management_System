import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { NavbarComponent } from "./navbar/navbar.component";
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DepartmentComponent } from './department/department.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    EmployeeListComponent,
    EditEmployeeComponent,
    DepartmentComponent,
    CreateDepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NavbarComponent,
    ReactiveFormsModule,
],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
