import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user'
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	sub: any;
	user: User;
	decks = [];
  current_user: any;
  followed: Boolean;

  constructor(private route: ActivatedRoute,
  						private userService: UserService,
              private authenticationService: AuthenticationService) { 
    this.current_user = this.authenticationService.currentUser();
  }

  ngOnInit() {
  	const self = this;
  	this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      this.userService
        .getUser(id)
        .subscribe(p => {
          self.user = p;
          self.decks = p.decks;
        }
      )
    });
    this.authenticationService.current_user$.subscribe(
      state => {
        self.current_user = state
      }
    );
  }

  openTab(tabName, titleName) {
    var i, x;
    x = document.getElementsByClassName("containerTab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }

    if (titleName == "bb1"){
      document.getElementById('bb1').classList.add("tab-active");
      document.getElementById('bb2').classList.remove("tab-active");
      document.getElementById('bb3').classList.remove("tab-active");
    }
    else if (titleName == "bb2"){
      document.getElementById('bb2').classList.add("tab-active");
      document.getElementById('bb1').classList.remove("tab-active");
      document.getElementById('bb3').classList.remove("tab-active");
    }
    else {
      document.getElementById('bb3').classList.add("tab-active");
      document.getElementById('bb1').classList.remove("tab-active");
      document.getElementById('bb2').classList.remove("tab-active");
    }

    document.getElementById(tabName).style.display = "block";
  }

  // toogleFollow() {
  //   (this.followed)? this.unFollow(): this.follow()
  // }

  // follow() {
  //   this.userService.follow(this.user.id).subscribe(
  //     data => {
  //       this.followed = true
  //   });
  // }

  // unFollow() {
  //   this.userService.unFollow(this.user.id).subscribe(
  //     data => {
  //       this.followed = false
  //   });
  // }
}
