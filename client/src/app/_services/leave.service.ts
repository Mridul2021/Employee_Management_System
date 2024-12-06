import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/leave/';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
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

  // Fetch all leaves
  getAllLeaves(): Observable<any[]> {
    return this.http.get<any[]>(API_URL, { headers: this.createHeaders() });
  }

  // Update leave status and approval date
  updateLeaveStatus(id: string, status: string, approvalDate: string): Observable<any> {
    const updateData = { status, approvalDate };
    return this.http.patch(`${API_URL}${id}/status`, updateData, {
      headers: this.createHeaders(),
    });
  }
  postLeaveRequest(leaveRequestData: any): Observable<any> {
    return this.http.post(API_URL, leaveRequestData, {
      headers: this.createHeaders(),
    });
  }
  getLeavesForUser(userName: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}user/${userName}`, {
      headers: this.createHeaders(),
    });
  }
}
