import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../_services/NotificationService';

@Component({
  selector: 'app-notification-post',
  templateUrl: './notification-post.component.html',
  styleUrls: ['./notification-post.component.css'],
})
export class NotificationPostComponent implements OnInit {
  username: string | null = null;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
    });
  }

  submitNotification(): void {
    if (this.username && this.message.trim() !== '') {
      this.notificationService.postNotification(this.username, this.message).subscribe(
        (response) => {
          console.log('Notification submitted', response);
          alert('Notification sent successfully!');
          this.message = ''; // Clear the message field
        },
        (error) => {
          console.error('Error submitting notification', error);
          alert('Failed to send notification. Please try again later.');
        }
      );
    } else {
      alert('Message cannot be empty!');
    }
  }
}
