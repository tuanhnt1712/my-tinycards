import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderBasicService } from './base/header-basic.service';
import { Headers } from '@angular/http';

@Injectable()
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:3000/api';
  private loginStateSource = new Subject<string>();

  loginState$ = this.loginStateSource.asObservable();

  constructor(private http: HttpClient,
              private headerBasicService: HeaderBasicService,
              private router: Router
  ){}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/sign_in`, { "grant_type": "password", email: email, password: password })
      .map(response => {
          let user = response.data
          if (user && user.token)
            this.loginStateSource.next('login');
            localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
      });
  }

  refresh() {
    var refresh_token = this.currentUser().refresh_token
    return this.http.post(`${this.baseUrl}/auth/sign_in`, { "grant_type": "refresh_token", refresh_token: refresh_token})
      .subscribe(response => {
        if (response['success'])
          var user = response['data']
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
      }, error => {
        console.log(error);
        this.router.navigate(['/login'])
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  tryRefresh(){
    if (this.currentUser() == null)
      this.router.navigate(['/login'])
    else
      this.refresh();
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') != null
  }

  getHeaders(): Headers {
    return this.headerBasicService.getHeaders();
  }



  handleError(error: any): Promise<any> {

    var UNAUTHORIZED = 401, TOKEN_REVOKED = 2605;
    if (error.status == UNAUTHORIZED)
      if (JSON.parse(error._body).errors[0].code == TOKEN_REVOKED)
        debugger
        this.tryRefresh();

    return Promise.reject(error.message || error);
  }
}
