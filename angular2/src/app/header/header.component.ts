import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  id: number;

  constructor(private authenticationService: AuthenticationService) {
    this.isAuthenticated = this.authenticationService.isLoggedIn();
  }

  ngOnInit() {
    this.authenticationService.loginState$.subscribe(
      state => {
        this.isAuthenticated = (state == 'login')
      }
    );
    this.id = this.authenticationService.currentUser().user_id
  }

  onLogout(){
    this.authenticationService.logout();
  }
}
