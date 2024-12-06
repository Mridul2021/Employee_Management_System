// view-performance.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceService } from '../_services/performance.service';

@Component({
  selector: 'app-view-performance',
  templateUrl: './view-performance.component.html',
  styleUrls: ['./view-performance.component.css'],
})
export class ViewPerformanceComponent implements OnInit {
  username: string | null = null;
  performanceReviews: any[] = []; // Array to hold performance reviews

  constructor(
    private route: ActivatedRoute,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    // Fetch the username from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
      if (this.username) {
        this.getPerformanceReviews(this.username);
      }
    });
  }

  // Function to get performance reviews for the username
  getPerformanceReviews(username: string): void {
    this.performanceService.getPerformanceByUsername(username).subscribe(
      (response) => {
        this.performanceReviews = response;
      },
      (error) => {
        console.error('Error fetching performance reviews:', error);
      }
    );
  }
}
