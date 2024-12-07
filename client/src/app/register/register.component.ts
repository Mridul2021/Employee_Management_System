import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { DepartmentService } from '../_services/department.service'; // Import DepartmentService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    role: null,
    information: {
      EmployeeId: null,
      Name: null,
      Phone: null,
      JobTitle: null,
      DepartmentName: null,
      DateOfJoining: null
    }
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showDialog = false; // State for dialog box
  dialogMessage = ''; // Message to display in the dialog
  departments: any[] = []; // To store fetched department names

  constructor(
    private authService: AuthService,
    private router: Router,
    private departmentService: DepartmentService // Inject DepartmentService
  ) { }

  ngOnInit(): void {
    // Fetch the departments on component initialization
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.departments = data; // Assign fetched departments to the array
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
      }
    });
  }

  onSubmit(): void {
    const { username, email, password, role, information } = this.form;
    
    this.authService.register(username, email, password, role, information).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.dialogMessage = 'User registered successfully!';
        this.showDialog = true;
      },
      error: err => {
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.dialogMessage = 'Signup failed, check the data';
        this.showDialog = true;
      }
    });
  }

  onDialogClose(): void {
    this.showDialog = false;
    if (this.isSuccessful) {
      this.router.navigate(['/empdetails']);
    }
  }
}
