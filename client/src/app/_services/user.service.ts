import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

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
  
}
