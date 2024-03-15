import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User'; // Make sure to import your User model

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9000/api/user';
  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(userID: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userID}`, user);
  }

  getUser(userID: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userID}`);
  }

  getAllUsers(): Observable<User[]> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<User[]>(`${this.baseUrl}`, { headers });
  }

  deleteUser(userID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userID}`);
  }
}
