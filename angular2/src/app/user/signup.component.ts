import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./login.component.css']
})

export class SignupComponent implements OnInit {
	model: any = {};
	loading = false;

  constructor(private userService: UserService,
  						private route: ActivatedRoute,
        			private router: Router
  ) {}

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
          data => {
              this.router.navigate(['/login']);
          },
          error => {
              this.loading = false;
          });
  }
}
