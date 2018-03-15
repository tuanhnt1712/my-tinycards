import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	sub: any;
	user: User;
	decks = [];

  constructor(private route: ActivatedRoute,
  						private userService: UserService) { }

  ngOnInit() {
  	const self = this;
  	this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      this.userService
        .getUser(id)
        .subscribe(p => {
          this.user = p;
          self.decks = p.decks;
        }
      )
    });
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
}
