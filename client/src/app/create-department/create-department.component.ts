import { Component } from '@angular/core';
import { DepartmentService } from '../_services/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent {
  form: any = {
    departmentId: null,
    name: null,
    description: null,
    createdDate: null
  };
  isSuccessful = false;
  isCreationFailed = false;
  errorMessage = '';
  showDialog = false; // State for dialog box
  dialogMessage = ''; // Message to display in the dialog

  constructor(private departmentService: DepartmentService, private router: Router) { }

  onSubmit(): void {
    const { departmentId, name, description, createdDate } = this.form;
    const formattedDate = this.formatDate(createdDate); // Format the createdDate

    // Send 'departmentId' as key and other fields
    const departmentData = {
      departmentId,
      name,
      description,
      createdDate: formattedDate  // Use 'createdDate' key to match the backend expectations
    };

    this.departmentService.createDepartment(departmentData).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isCreationFailed = false;
        this.dialogMessage = 'Department created successfully!';
        this.showDialog = true; // Show success dialog
      },
      error: err => {
        this.isSuccessful = false;
        this.isCreationFailed = true;
        this.dialogMessage = 'Department creation failed, check the data'; // Show error message
        this.showDialog = true; // Show dialog for failure
      }
    });
  }

  private formatDate(date: string): string {
    if (!date) return '2024-12-01T00:00:00'; // Default date if empty

    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) return '2024-12-01T00:00:00'; // Default date if invalid

    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}T00:00:00`; // Format date to match backend's expected format
  }

  onDialogClose(): void {
    this.showDialog = false; // Hide the dialog box
    if (this.isSuccessful) {
      this.router.navigate(['/department']); // Navigate to departments list if successful
    }
  }
}
