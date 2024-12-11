import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../_services/leave.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css'],
})
export class LeaveRequestComponent {
  leaveRequest = {
    userName: '',
    leaveType: 'Sick Leave',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Pending',
    approvalDate: null,
  };
  showConfirmation: boolean = false;

  constructor(private leaveService: LeaveService, private router: Router) {
    // Get user info from session storage
    const user = sessionStorage.getItem('auth-user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.leaveRequest.userName = parsedUser.username;
    }
  }

  submitLeaveRequest() {
    console.log(this.leaveRequest);
    this.leaveService.postLeaveRequest(this.leaveRequest).subscribe(
      (response) => {
        console.log('Leave request submitted successfully', response);
        this.showConfirmation = true;
      },
      (error) => {
        console.error('Error submitting leave request', error);
      }
    );
  }

  navigateToDashboard(): void {
    this.showConfirmation = false;
    this.router.navigate(['/login']);
  }
}
