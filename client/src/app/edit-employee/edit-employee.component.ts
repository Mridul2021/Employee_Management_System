import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  form: FormGroup;
  username!: string;
  isUpdateSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';
  showDialog = false;
  dialogMessage = ''; 

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: this.username,
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      information: this.fb.group({
        EmployeeId: ['', [Validators.required]],
        Name: ['', [Validators.required]],
        Phone: ['', [Validators.required]],
        JobTitle: ['', [Validators.required]],
        DepartmentName: ['', [Validators.required]],
        DateOfJoining: ['', [Validators.required]],
        status: ['', [Validators.required]],
      })
    });
  }    

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    console.log(this.username);
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getEmployeeDetails(this.username).subscribe({
      next: (data) => {
        this.form.patchValue({
          email: data.email,
          password: '',
          role: data.role,
          information: {
            EmployeeId: data.information.EmployeeId,
            Name: data.information.Name,
            Phone: data.information.Phone,
            JobTitle: data.information.JobTitle,
            DepartmentName: data.information.DepartmentName,
            DateOfJoining: data.information.DateOfJoining,
            status: data.information.status
          }
        });
      },
      error: (err) => {
        this.isUpdateFailed = true;
        this.errorMessage = 'Failed to load user details';
      },
    });
  }

  onSubmit(): void {
    console.log("Submitting form with username:", this.username);
    console.log(this.form.value);
      const { email, password, role, information } = this.form.value;
      const formattedInformation = {
      EmployeeId: information.EmployeeId,
      Name: information.Name,
      Phone: information.Phone,
      JobTitle: information.JobTitle,
      DepartmentName: information.DepartmentName,
      DateOfJoining: information.DateOfJoining
    };
  
    this.userService.updateInfo(this.username, email, role, formattedInformation).subscribe({
      next: (data) => {
        this.isUpdateSuccessful = true;
        this.isUpdateFailed = false;
        this.dialogMessage = data;
        console.log("Update success:", data);
        this.showDialog = true;
      },
      error: (err) => {
        this.isUpdateSuccessful = false;
        this.isUpdateFailed = true;
        this.dialogMessage = 'Update failed, please check the data';
        console.log("Error:", err);
        this.showDialog = true;
      }
    });
  }
  
  

  onDialogClose(): void {
    this.showDialog = false;
    if (this.isUpdateSuccessful) {
      this.router.navigate(['/empdetails']);
    }
  }
}
