import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	model: any = {};
	loading = false;
	returnUrl: string;

  constructor(private authenticationService: AuthenticationService,
  						private route: ActivatedRoute,
        			private router: Router,
              private alertService: AlertService
  ) { }

  ngOnInit() {
  	this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          error.error.errors.forEach(body => {
            this.alertService.error(body.message);
          })
        });
    }
}
