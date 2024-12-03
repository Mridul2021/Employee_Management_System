import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../_services/department.service'; // Adjust import as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  departments: any[] = [];
  selectedDepartment: any = null;
  departmentToDelete: any = null; // For tracking the department to be deleted
  showDeleteModal: boolean = false; // For toggling delete modal

  constructor(private departmentService: DepartmentService, private router: Router) { }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  // Fetch departments from the API
  fetchDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      (data) => {
        this.departments = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  // Show more information about the department
  showMoreInfo(department: any): void {
    this.selectedDepartment = department;
  }

  // Close the modal
  closeModal(): void {
    this.selectedDepartment = null;
  }

  // Open delete modal
  confirmDelete(department: any): void {
    this.departmentToDelete = department;
    this.showDeleteModal = true;
  }

  // Close delete modal
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.departmentToDelete = null;
  }

  // Delete the department
  deleteDepartment(): void {
    if (this.departmentToDelete) {
      this.departmentService.deleteDepartment(this.departmentToDelete.departmentId).subscribe(
        (response) => {
          console.log('Department deleted:', response);
          console.log(this.departmentToDelete);
          this.departments = this.departments.filter(
            (dept) => dept.departmentId !== this.departmentToDelete.departmentId
          );
          this.closeDeleteModal(); // Close modal after deletion
        },
        (error) => {
          console.error('Error deleting department:', error);
        }
      );
    }
  }

  // Edit department
  editDepartment(id: string): void {
    this.router.navigate(['/edit-department', id]);
  }
}
