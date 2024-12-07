import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL_DEPARTMENT = environment.API_URL_DEPARTMENT;

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
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

  createDepartment(department: {
    name: string;
    description: string;
    createdDate: string;
  }): Observable<any> {
    return this.http.post(API_URL_DEPARTMENT, department, { headers: this.createHeaders() });
  }

  getAllDepartments(): Observable<any[]> {
    return this.http.get<any[]>(API_URL_DEPARTMENT, { headers: this.createHeaders() });
  }

  getDepartmentById(id: string): Observable<any> {
    return this.http.get(`${API_URL_DEPARTMENT}${id}`, { headers: this.createHeaders() });
  }

  updateDepartment(
    id: string,
    department: { name: string; description: string; createdDate: string }
  ): Observable<any> {
    return this.http.put(`${API_URL_DEPARTMENT}${id}`, department, { headers: this.createHeaders() });
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL_DEPARTMENT}${id}`, { headers: this.createHeaders() });
  }
}
