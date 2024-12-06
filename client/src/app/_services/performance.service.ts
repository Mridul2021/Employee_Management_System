import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:8080/api/performance';

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private apiUrl = 'http://localhost:8080/api/performance';
  constructor(private http: HttpClient) {}

  // Helper function to fetch token from sessionStorage
  private getAuthToken(): string | null {
    const user = sessionStorage.getItem('auth-user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.token;
    }
    return null;
  }

  // Function to create headers with the authorization token
  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  // Function to post performance review
  postPerformanceReview(username: string, remark: string): Observable<any> {
    const body = { userName: username, remark };
    const headers = this.createHeaders();
    return this.http.post(API_URL, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error posting performance review:', error);
        throw error;
      })
    );
  }

  // Function to get performance reviews by username, now using createHeaders
  getPerformanceByUsername(username: string): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${username}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching performance reviews:', error);
        throw error;
      })
    );
  }
}
