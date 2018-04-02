import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user'
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'settings-user',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public formUser: FormGroup;
  public formPassWord: FormGroup;
  sub: any;
  user: User;
  current_user: any;

  constructor(private _fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
  						private userService: UserService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
    this.current_user = this.authenticationService.currentUser();
  }

  ngOnInit() {
    this.formUser = this._fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      bio: [''],
      avatar: ['']
    });

    this.formPassWord = this._fb.group({
      current_password: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    });

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
          self.formUser.setValue({
            id: self.user.id,
            name: self.user.name,
            email: self.user.email,
            bio: self.user.bio,
            avatar: self.user.avatar
          })
        }
      )
    });

  }

  openTab(tabName, titleName) {
    var i, x, shows;
    x = document.getElementsByClassName("item");
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("active");
    }

    shows = document.getElementsByClassName("show-value");
    for (i = 0; i < shows.length; i++) {
      shows[i].style.display = "none";
    }

    document.getElementById(titleName).classList.add("active");
    document.getElementById(tabName).style.display = "block";
  }

  save(model: User) {
    this.userService.editUser(model["value"]).subscribe(
      data => {
        this.router.navigate(['/users/'+this.user.id]);
        this.alertService.success("Edit profile successfuly");
      },
      error => {
        JSON.parse(error._body).errors.forEach(body => {
          this.alertService.error(body.field + " " + body.message);
        })
      });
  }

  changePassword(model) {
    this.userService.changePassword(model["value"]).subscribe(
      data => {
        this.router.navigate(['/users/' + this.user.id]);
        this.alertService.success("Change password successfuly");
      },
      error => {
        JSON.parse(error._body).errors.forEach(body => {
          this.alertService.error(body.field + " " + body.message);
        })
      });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        (<HTMLInputElement>document.getElementById('avatar-default')).setAttribute('src', reader.result);
        this.formUser.controls['avatar'].setValue(reader.result)
      }
    }
  }
}
