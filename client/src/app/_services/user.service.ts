import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  // Function to get the bearer token from localStorage
  private getAuthToken(): string | null {
    const user = sessionStorage.getItem('auth-user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.token;  // Return the token from the parsed object
    }
    return null;
  }
  

  // Function to create headers with authorization token
  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
  


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { headers: this.createHeaders(), responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/user/all', {
      headers: this.createHeaders(),
    });
  }
  deleteUser(username: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/user/delete/${username}`, {
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
      `${API_URL}updateInfo/${username}`,
      { email, role, information }, {
        headers: this.createHeaders(),
        responseType: 'text'  // Specify 'text' responseType since the response is a string

      }
    );
  }
   // New method to get employee details by username
   getEmployeeDetails(username: string): Observable<any> {
    return this.http.get(
      `${API_URL}getUser/${username}`,{
        headers: this.createHeaders(),
      }
    );
  }
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${API_URL}getUser/${username}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  
}
