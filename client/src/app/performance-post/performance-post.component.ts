import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceService } from '../_services/performance.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance-post.component.html',
  styleUrls: ['./performance-post.component.css'],
})
export class PerformancePostComponent implements OnInit {
  username: string | null = null;
  remark: string = '';

  constructor(
    private route: ActivatedRoute,
    private performanceService: PerformanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
    });
  }

  submitReview(): void {
    if (this.username) {
      this.performanceService
        .postPerformanceReview(this.username, this.remark)
        .subscribe(
          (response) => {
            console.log('Performance review submitted', response);
          },
          (error) => {
            console.error('Error submitting review', error);
          }
        );
    }
  }
}
