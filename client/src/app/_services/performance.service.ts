import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const API_URL_PERFORMANCE = environment.API_URL_PERFORMANCE;

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private apiUrl = environment.API_URL_PERFORMANCE;
  constructor(private http: HttpClient) {}

  private getAuthToken(): string | null {
    const user = sessionStorage.getItem('auth-user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.token;
    }
    return null;
  }

  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  postPerformanceReview(username: string, remark: string): Observable<any> {
    const body = { userName: username, remark };
    const headers = this.createHeaders();
    return this.http.post(API_URL_PERFORMANCE, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error posting performance review:', error);
        throw error;
      })
    );
  }

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
