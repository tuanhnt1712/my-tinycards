import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderBasicService {
  commonHeader: Headers;

  csrfTokenElm = document.getElementsByName('csrf-token');
  csrfToken = this.csrfTokenElm[0] ? this.csrfTokenElm[0].getAttribute('content') : '';

  constructor(
  ){
    this.commonHeader = this.getHeaders();
  }

  getHeaders() {
    return new Headers({
      'Content-Type': 'application/json',
      'X-CSRF-Token': this.csrfToken,
      'Doorkeeper-Token': 'Bearer ' + this.getAccessToken(),
      'X-Locale': "en"
    });
  }

  currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  getAccessToken(){
    return this.currentUser() ? this.currentUser().token : null;
  }
}
