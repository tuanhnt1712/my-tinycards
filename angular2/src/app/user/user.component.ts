import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
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
  current_user: any;

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
