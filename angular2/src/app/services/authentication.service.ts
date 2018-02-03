import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../user';

@Injectable()
export class AuthenticationService {
	public token: string;
	public currentUser: User;
  constructor(private http: HttpClient) { 
  	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/auth/sign_in', { "grant_type": "password", email: email, password: password })
      .map(response => {
          var user = response.data
          if (user && user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
      });
  }

  logout() {
      localStorage.removeItem('currentUser');
  }
}