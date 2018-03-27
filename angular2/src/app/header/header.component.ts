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
    var text = searchTerm.value
    this.decksService.searchDeck(text).then(data => {
      this.decksService.publishData(data);
      this.router.navigate(['/search'], {queryParams: { q: text}});
    });
  }

  show(){
    var i, x;
    document.getElementById('ip-search').style.display = 'block';
    document.getElementById('icon-cancle').style.display = 'block';
    x = document.getElementsByClassName('nav-item');
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
    }
  }

  hid(){
    var i, x;
    document.getElementById('f-se').style.display = 'block';
    document.getElementById('icon-cancle').style.display = 'none';
    document.getElementById('ip-search').style.display = 'none';
    x = document.getElementsByClassName('nav-item');
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'block';
    }
  }
}
