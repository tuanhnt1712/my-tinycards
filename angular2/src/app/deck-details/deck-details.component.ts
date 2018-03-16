import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule, FormControl } from '@angular/forms';

import { Deck } from '../deck';
import { User } from '../user'
import { DecksService } from '../services/decks.service';
import { UserService } from '../services/user.service';

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
  id: number;
  menuOpen = false;
  favorited = false;
  user: User;
  constructor(private decksService: DecksService,
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder,
    private userService: UserService
   ) {}

  ngOnInit() {
    this.myFormLesson = this._fb.group({
      lesson_id: ['', [Validators.required]]
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
          this.userService.getUser(p.id).subscribe(
            data => {
              this.user = data
          });
        }
      )
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
    });
  }

  unFavorite() {
    this.decksService.unFavorite(this.deck.id).subscribe(
      data => {
        this.favorited = false
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
    this.menuOpen = !this.menuOpen;
  }
}
