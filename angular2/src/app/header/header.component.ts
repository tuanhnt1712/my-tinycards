import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DecksService } from '../services/decks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  current_user: any;

  constructor(private authenticationService: AuthenticationService,
              private decksService: DecksService,
              private router: Router) {
    this.isAuthenticated = this.authenticationService.isLoggedIn();
    this.current_user = this.authenticationService.currentUser();
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
        self.current_user = state
      }
    );
  }

  onLogout(){
    this.authenticationService.logout();
  }

  performSearch(searchTerm: HTMLInputElement): void {
    this.decksService.searchDeck(searchTerm.value).then(data => {
      this.decksService.publishData(data);
      this.router.navigate(['/search']);
    });
  }
}
