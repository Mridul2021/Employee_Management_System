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
  employeeToDelete: any = null;
  showDeleteModal: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

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

  showMoreInfo(employee: any): void {
    this.selectedEmployee = employee;
  }

  closeModal(): void {
    this.selectedEmployee = null;
  }

  confirmDelete(employee: any): void {
    this.employeeToDelete = employee;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  deleteEmployee(): void {
    if (this.employeeToDelete) {
      this.userService.deleteUser(this.employeeToDelete.username).subscribe(
        (response) => {
          console.log('Employee deleted:', response);
          this.employees = this.employees.filter(
            (emp) => emp.username !== this.employeeToDelete.username
          );
          this.closeDeleteModal();
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
  sendNotification(username: string): void {
    this.router.navigate(['/send-notification', username]);
  }
}
