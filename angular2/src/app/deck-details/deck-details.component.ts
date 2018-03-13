import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule, FormControl } from '@angular/forms';

import { Deck } from '../deck';
import { DecksService } from '../services/decks.service';

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

  constructor(private decksService: DecksService,
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder
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
          self.lessons = p.lessons;
        }
      )
    });
  }

  click_lesson(id, model){
    this.myFormLesson.setValue({lesson_id: id });
    this.router.navigate(['decks/'+ this.id +'/lessons/'+ id]);
  }

  openTab(tabName, titleName) {
    var i, x;
    x = document.getElementsByClassName("containerTab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }

    if (titleName == "bb1"){
      document.getElementById('bb1').classList.add("s-active");
      document.getElementById('bb2').classList.remove("s-active");
    }
    else {
      document.getElementById('bb2').classList.add("s-active");
      document.getElementById('bb1').classList.remove("s-active");
    }

    document.getElementById(tabName).style.display = "block";
  }


  flipped($event){
    this.menuOpen = !this.menuOpen;
    document.getElementById('continue-card').classList.remove('hide')
  }
}
