import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./login.component.css']
})

export class SignupComponent implements OnInit {
	model: any = {};
	loading = false;
  returnUrl: string;

  constructor(private authenticationService: AuthenticationService,
  						private route: ActivatedRoute,
        			private router: Router,
              private alertService: AlertService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  register() {
    this.loading = true;
    this.authenticationService.create(this.model)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          error.error.errors.forEach(body => {
            this.alertService.error(body.field + " " + body.message);
          })
        }
      );
  }
}
