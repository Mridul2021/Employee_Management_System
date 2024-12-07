import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL_USER = environment.API_URL_USER;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }
  
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
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
  
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL_USER + 'all', { headers: this.createHeaders(), responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL_USER + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL_USER + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL_USER + 'admin', { responseType: 'text' });
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(API_URL_USER+'all', {
      headers: this.createHeaders(),
    });
  }
  deleteUser(username: string): Observable<any> {
    return this.http.delete(API_URL_USER+`/delete/${username}`, {
      headers: this.createHeaders(),
      responseType: 'text',
    });
  }
  updateInfo(
    username: string, 
    email: string, 
    role: string, 
    information: { 
      EmployeeId: string; 
      Name: string; 
      Phone: string; 
      JobTitle: string; 
      DepartmentName: string; 
      DateOfJoining: string; 
    }
  ): Observable<any> {
    return this.http.put(
      `${API_URL_USER}updateInfo/${username}`,
      { email, role, information }, {
        headers: this.createHeaders(),
        responseType: 'text'

      }
    );
  }
   getEmployeeDetails(username: string): Observable<any> {
    return this.http.get(
      `${API_URL_USER}getUser/${username}`,{
        headers: this.createHeaders(),
      }
    );
  }
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${API_URL_USER}getUser/${username}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  
}
