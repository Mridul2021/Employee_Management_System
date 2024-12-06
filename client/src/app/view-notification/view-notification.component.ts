import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../_services/NotificationService';

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css'],
})
export class ViewNotificationComponent implements OnInit {
  username: string | null = null;
  notifications: any[] = []; // Array to hold notifications

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Fetch the username from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
      if (this.username) {
        this.getNotifications(this.username);
      }
    });
  }

  // Function to get notifications for the username
  getNotifications(username: string): void {
    this.notificationService.getNotifications(username).subscribe(
      (response) => {
        this.notifications = response;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
}
