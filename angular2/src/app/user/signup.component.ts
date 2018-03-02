import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./login.component.css']
})

export class SignupComponent implements OnInit {
	model: any = {};
	loading = false;

  constructor(private authenticationService: AuthenticationService,
  						private route: ActivatedRoute,
        			private router: Router
  ) {}

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.authenticationService.create(this.model)
      .subscribe(
          data => {
              this.router.navigate(['/']);
          },
          error => {
              this.loading = false;
          });
  }
}
