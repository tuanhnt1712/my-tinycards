import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  current_user_id: any;
  current_user_name: any;

  constructor(private authenticationService: AuthenticationService) {
    this.isAuthenticated = this.authenticationService.isLoggedIn();
  }

  ngOnInit() {
    const self = this;
    this.authenticationService.loginState$.subscribe(
      state => {
        this.isAuthenticated = (state == 'login')
      }
    );
    this.authenticationService.current_user$.subscribe(
      state => {
        this.current_user_id = state.user_id
        this.current_user_name = state.name
      }
    );
  }

  onLogout(){
    this.authenticationService.logout();
  }
}
