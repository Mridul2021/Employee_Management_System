import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const { username, email, password, role, information } = this.form;

    this.authService.register(username, email, password, role, information).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.dialogMessage = 'User registered successfully!';
        this.showDialog = true; // Show success dialog
      },
      error: err => {
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.dialogMessage = 'Signup failed, check the data'; // Show error message
        this.showDialog = true; // Show dialog for failure
      }
    });
  }

  onDialogClose(): void {
    this.showDialog = false; // Hide the dialog box
    if (this.isSuccessful) {
      this.router.navigate(['/empdetails']); // Navigate to /empdetails if successful
    }
  }
}
