import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'; // Adjust import as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  selectedEmployee: any = null;
  employeeToDelete: any = null; // For tracking the employee to be deleted
  showDeleteModal: boolean = false; // For toggling delete modal

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  // Fetch employees from the API
  fetchEmployees(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.employees = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  // Show more information about the employee
  showMoreInfo(employee: any): void {
    this.selectedEmployee = employee;
  }

  // Close the modal
  closeModal(): void {
    this.selectedEmployee = null;
  }

  // Open delete modal
  confirmDelete(employee: any): void {
    this.employeeToDelete = employee;
    this.showDeleteModal = true;
  }

  // Close delete modal
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  // Delete the employee
  deleteEmployee(): void {
    if (this.employeeToDelete) {
      this.userService.deleteUser(this.employeeToDelete.username).subscribe(
        (response) => {
          console.log('Employee deleted:', response);
          this.employees = this.employees.filter(
            (emp) => emp.username !== this.employeeToDelete.username
          );
          this.closeDeleteModal(); // Close modal after deletion
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  // Edit employee
  editEmployee(username: string): void {
    this.router.navigate(['/edit', username]);
  }
  reviewHostory(username: string): void {
    this.router.navigate(['/view-performance', username]);
  }
  giveReview(username: string): void {
    this.router.navigate(['/editperformance', username]);
  }
}
