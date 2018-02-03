import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
              private router: Router
  ){}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/sign_in`, { "grant_type": "password", email: email, password: password })
      .map(response => {
          let user = response.data
          if (user && user.token)
            localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') != null
  }
}