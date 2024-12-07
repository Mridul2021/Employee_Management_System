import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const API_URL_NOTIFICATION = environment.API_URL_NOTIFICATION;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
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

  postNotification(username: string, message: string): Observable<any> {
    const body = { username, message };
    const headers = this.createHeaders();
    return this.http.post(API_URL_NOTIFICATION, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error posting notification:', error);
        throw error;
      })
    );
  }

  getNotifications(username: string): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(`${API_URL_NOTIFICATION}/${username}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching notifications:', error);
        throw error;
      })
    );
  }
}
