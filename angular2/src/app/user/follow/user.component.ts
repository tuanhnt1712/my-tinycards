import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../user'
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'user-follow-detail',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserFollowDetailComponent {
	sub: any;
	@Input() user: User;
	decks = [];
  current_user: any;

  constructor(private route: ActivatedRoute,
  						private userService: UserService,
              private authenticationService: AuthenticationService) {
    this.current_user = this.authenticationService.currentUser();
  }

  toogleFollow(user) {
    (user.followed)? this.unFollow(user): this.follow(user)
  }

  follow(user) {
    this.userService.follow(user.id).subscribe(
      data => {
        this.user = data.data
    });
  }

  unFollow(user) {
    this.userService.unFollow(user.id).subscribe(
      data => {
        this.user = data.data
    });
  }
}
