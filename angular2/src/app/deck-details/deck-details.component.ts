import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Deck } from '../deck';
import { User } from '../user'
import { DecksService } from '../services/decks.service';
import { UserService } from '../services/user.service';
declare var $: any;

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css']
})
export class DeckDetailsComponent implements OnInit {
  deck: Deck;
  sub: any;
  cards = [];
  lessons = [];
  public myFormLesson: FormGroup;
  feedbackForm: FormGroup;
  id: number;
  menuOpen = false;
  favorited = false;
  user: User;
  current_user: any;
  constructor(private authenticationService: AuthenticationService,
    private decksService: DecksService,
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder,
    private userService: UserService
   ) {
    this.current_user = this.authenticationService.currentUser();
  }

  ngOnInit() {
    this.myFormLesson = this._fb.group({
      lesson_id: ['', [Validators.required]]
    })
    this.feedbackForm = this._fb.group({
      feedback: ['', [Validators.required]]
    })
    const self = this;
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      self.id = id;
      this.decksService
        .get(id)
        .subscribe(p => {
          this.deck = p;
          self.favorited = p.favorited
          self.lessons = p.lessons;
          this.userService.getUser(p.user_id).subscribe(
            data => {
              this.user = data
          });
        }
      )
    });
  }

  ngAfterViewInit() {
    $('document').ready(function() {
      var that = $('#front-value');
      var textLength = that.val().length;

      if (textLength > 150) {
          that.css('font-size', '16px');
      } else if(textLength > 100) {
          that.css('font-size', '20px');
      } else if(textLength > 60) {
          that.css('font-size', '22px');
      }
    });
  }

  click_lesson(id, model){
    this.myFormLesson.setValue({lesson_id: id });
    this.router.navigate(['decks/'+ this.id +'/lessons/'+ id]);
  }

  toogleFavorite() {
    (this.favorited)? this.unFavorite(): this.favorite()
  }

  favorite() {
    this.decksService.favorite(this.deck.id).subscribe(
      data => {
        this.favorited = true
        this.deck = data.data
    });
  }

  unFavorite() {
    this.decksService.unFavorite(this.deck.id).subscribe(
      data => {
        this.favorited = false
        this.deck = data.data
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
    }
    else {
      document.getElementById('bb2').classList.add("tab-active");
      document.getElementById('bb1').classList.remove("tab-active");
    }

    document.getElementById(tabName).style.display = "block";
  }


  flipped($event){
    $event.currentTarget.classList.toggle('flipped')
  }

  sendReport(model){
    (<HTMLInputElement>document.getElementById('closeModalButton1')).click();
    this.decksService.feed_back(this.current_user.user_id, this.deck.id, model["value"].feedback).subscribe(
      data => {
        alert("Thanks for your feedback!");
    });
  }
}
