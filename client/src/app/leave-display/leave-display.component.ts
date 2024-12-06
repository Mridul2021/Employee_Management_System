import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../_services/leave.service'; // Import your service

@Component({
  selector: 'app-leave-display',
  templateUrl: './leave-display.component.html',
  styleUrls: ['./leave-display.component.css']
})
export class LeaveDisplayComponent implements OnInit {
  userName: string | null = '';  // Store the username
  leaves: any[] = [];            // Store leave data

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    // Fetch the auth-user object from sessionStorage
    const authUser = sessionStorage.getItem('auth-user');
    
    // If auth-user exists, parse it and fetch the username
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      this.userName = parsedUser.username;  // Extract username from the object
    
      // If username is available, fetch the leave data
      if (this.userName) {
        this.leaveService.getLeavesForUser(this.userName).subscribe(
          (data) => {
            this.leaves = data;  // Store leave data in the leaves array
            console.log(data);
          },
          (error) => {
            console.error('Error fetching leaves:', error);
          }
        );
      }
    } else {
      console.error('No user found in sessionStorage');
    }
  }
}
