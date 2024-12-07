import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL_LEAVE = environment.API_URL_LEAVE;

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
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

  getAllLeaves(): Observable<any[]> {
    return this.http.get<any[]>(API_URL_LEAVE, { headers: this.createHeaders() });
  }

  updateLeaveStatus(id: string, status: string, approvalDate: string): Observable<any> {
    const updateData = { status, approvalDate };
    return this.http.patch(`${API_URL_LEAVE}${id}/status`, updateData, {
      headers: this.createHeaders(),
    });
  }
  postLeaveRequest(leaveRequestData: any): Observable<any> {
    return this.http.post(API_URL_LEAVE, leaveRequestData, {
      headers: this.createHeaders(),
    });
  }
  getLeavesForUser(userName: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL_LEAVE}user/${userName}`, {
      headers: this.createHeaders(),
    });
  }
}
