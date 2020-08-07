import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH = 'http://localhost:8080/auth/';
const PROFILE = 'http://localhost:8080/profile/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH + 'register', {
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  update(user): Observable<any> {
    return this.http.post(PROFILE + 'edit', {
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
