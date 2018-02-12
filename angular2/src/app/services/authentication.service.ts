import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
              private router: Router
  ){
    setInterval(function(){ this.refreshToken(); }, 2);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/sign_in`, { "grant_type": "password", email: email, password: password })
      .map(response => {
          let user = response.data
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            // localStorage.setItem('id_token', user.access_token);
            // localStorage.setItem('refresh_token', user.refresh_token);
            // return tokenNotExpired();
          }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
      return localStorage.getItem('currentUser') != null
    }

  schedule(){
      this.refreshToken()
      .subscribe(
        data => {
          if (data.error)
            this.logout();
          else {
            localStorage.setItem('currentUser', JSON.stringify(data));
            // localStorage.setItem('id_token', data.access_token);
            // localStorage.setItem('refresh_token', data.refresh_token);
            console.log("Token was refreshed.");
          }
        },
        error => this.logout(),
        () =>  {
          return tokenNotExpired();
        }
      );
  }

  refreshToken() {
    let refToken = JSON.parse(localStorage.getItem('currentUser')).refresh_token;
    if (refToken) {
      return this.http.post<any>(`${this.baseUrl}/auth/sign_in`, { "grant_type": "refresh_token", refresh_token: refToken })
      .map(res => res.json());
    } else {
      this.logout();
    }
  }
}