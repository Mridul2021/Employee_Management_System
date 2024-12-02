import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'; // Adjust import as necessary

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  selectedEmployee: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  // Fetch employees from the API
  fetchEmployees(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.employees = data;
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
}
