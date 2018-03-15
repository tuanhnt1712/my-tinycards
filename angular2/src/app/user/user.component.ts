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

}
