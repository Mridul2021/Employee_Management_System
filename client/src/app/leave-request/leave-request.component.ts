import { Component } from '@angular/core';
import { LeaveService } from '../_services/leave.service'; // Import the LeaveService

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent {
  leaveRequest = {
    userName: '',  // Will be populated from sessionStorage
    leaveType: 'Sick Leave',  // Default to 'Sick Leave'
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Pending',  // Default to 'Pending'
    approvalDate: null
  };

  constructor(private leaveService: LeaveService) {
    // Fetch the username from sessionStorage
    const user = sessionStorage.getItem('auth-user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.leaveRequest.userName = parsedUser.username;  // Set username from session storage
    }
  }

  submitLeaveRequest() {
    const leaveRequestData = {
      userName: this.leaveRequest.userName,
      LeaveType: this.leaveRequest.leaveType,
      StartDate: this.leaveRequest.startDate,
      EndDate: this.leaveRequest.endDate,
      Reason: this.leaveRequest.reason,
      Status: this.leaveRequest.status,  // Pending by default
      ApprovalDate: this.leaveRequest.approvalDate // Null by default
    };

    // Call the service to post the leave request
    this.leaveService.postLeaveRequest(leaveRequestData).subscribe(
      (response) => {
        console.log('Leave request submitted successfully', response);
      },
      (error) => {
        console.log(leaveRequestData);
        console.error('Error submitting leave request', error);
      }
    );
  }
}
