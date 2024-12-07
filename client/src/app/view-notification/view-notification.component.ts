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
  notifications: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
      if (this.username) {
        this.getNotifications(this.username);
      }
    });
  }

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
