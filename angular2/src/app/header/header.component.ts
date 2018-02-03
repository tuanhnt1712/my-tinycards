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

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {    
    this.isAuthenticated = this.authenticationService.isLoggedIn();



    console.log(this.authenticationService.isLoggedIn())
  }

  onLogout(){
    this.authenticationService.logout();
  }

}
