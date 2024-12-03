import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/department/';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
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

  // Create a new department
  createDepartment(department: {
    name: string;
    description: string;
    createdDate: string;
  }): Observable<any> {
    return this.http.post(API_URL, department, { headers: this.createHeaders() });
  }

  // Get all departments
  getAllDepartments(): Observable<any[]> {
    return this.http.get<any[]>(API_URL, { headers: this.createHeaders() });
  }

  // Get department by ID
  getDepartmentById(id: string): Observable<any> {
    return this.http.get(`${API_URL}${id}`, { headers: this.createHeaders() });
  }

  // Update an existing department
  updateDepartment(
    id: string,
    department: { name: string; description: string; createdDate: string }
  ): Observable<any> {
    return this.http.put(`${API_URL}${id}`, department, { headers: this.createHeaders() });
  }

  // Delete a department by ID
  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}${id}`, { headers: this.createHeaders() });
  }
}
