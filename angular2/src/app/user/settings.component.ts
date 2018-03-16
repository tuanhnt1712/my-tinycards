import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user'
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'settings-user',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	sub: any;
	user: User;
  current_user: any;

  constructor(private route: ActivatedRoute,
  						private userService: UserService,
              private authenticationService: AuthenticationService) { 
    this.current_user = this.authenticationService.currentUser();
  }

  ngOnInit() {
  	const self = this;
    this.authenticationService.current_user$.subscribe(
      state => {
        self.current_user = state
      }
    );
  	this.sub = this.route.params.subscribe(params => {
      this.userService
        .getUserEdit(self.current_user.user_id)
        .subscribe(p => {
          self.user = p;
        }
      )
    });
  }

  save(model) {
    // TODO
  }
}