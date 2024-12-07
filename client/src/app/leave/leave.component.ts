import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../_services/leave.service';
import { UserService } from '../_services/user.service'; // Assuming you have a UserService for fetching user details
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
})
export class LeaveComponent implements OnInit {
  leaves: any[] = [];
  users: any[] = []; // Users data for matching with username
  selectedLeave: any = null;
  showDeleteModal: boolean = false; // For toggling delete modal
  showApproveModal: boolean = false; // For toggling approve modal
  leaveToApprove: any = null; // For tracking the leave to approve

  constructor(
    private leaveService: LeaveService,
    private userService: UserService, // User service to fetch user data
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchLeaves();
    this.fetchUsers(); // Fetch users to match with username
  }

  // Fetch leaves from the API
  fetchLeaves(): void {
    this.leaveService.getAllLeaves().subscribe(
      (data) => {
        this.leaves = data;
        console.log(data);
        this.matchEmployeeNameWithLeave(); // After fetching leave data, match with employee name
      },
      (error) => {
        console.error('Error fetching leaves:', error);
      }
    );
  }

  // Fetch all users from the user service
  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Match employee name with leave data
  matchEmployeeNameWithLeave(): void {
    this.leaves.forEach((leave) => {
      const user = this.users.find((user) => user.username === leave.userName);
      if (user) {
        leave.employeeName = user.information.Name; // Add employee name to leave object
      }
    });
  }

  // Get the full name of the user based on their username
  getUserFullName(username: string): string {
    const user = this.users.find((user) => user.username === username);
    return user ? user.information.Name : 'Unknown User';
  }

  // Show leave details
  showMoreInfo(leave: any): void {
    this.selectedLeave = leave;
  }

  // Open approve modal
  approveLeave(leave: any): void {
    this.leaveToApprove = leave;
    this.showApproveModal = true;
  }

  confirmApprove(): void {
    const approvalDate = new Date().toISOString();
    this.leaveService
      .updateLeaveStatus(this.leaveToApprove.id, 'Approved', approvalDate)
      .subscribe(
        (response) => {
          console.log('Leave approved:', response);
          this.leaveToApprove.status = 'Approved';
          this.leaveToApprove.approvalDate = approvalDate;
          this.showApproveModal = false;
        },
        (error) => {
          console.log(this.leaveToApprove._id);
          console.error('Error approving leave:', error);
        }
      );
  }

  closeModal(): void {
    this.selectedLeave = null;
    this.leaveToApprove = null;
  }

  confirmDelete(leave: any): void {
    this.selectedLeave = leave;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedLeave = null;
  }
}
