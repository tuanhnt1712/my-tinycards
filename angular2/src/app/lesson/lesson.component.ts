import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../services/decks.service';
import { Lesson } from '../lesson';
import { FormWizardModule } from 'angular2-wizard';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  sub: any;
	menuOpen = false;
  lessons = [];
  cards = [];
  current_card: any;

  constructor(private decksService: DecksService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const self = this;
    this.sub = this.route.params.subscribe(params => {
        let id = Number.parseInt(params['id']);
         this.decksService
          .get_lesson(id)
          .subscribe(function(p){ 
            self.randomAnswers(p.cards[0], p.cards);
            self.cards = p.cards;
            self.current_card = p.cards[0];
          })
      return self.cards;
    });
  }

  flipped($event){
    this.menuOpen = !this.menuOpen;
  }

  ok(id, model) {
    this.decksService.create_user_lesson(model["value"]).subscribe(
      data => {
        this.router.navigate(['decks/']);
        return true;
    });
  }

  randomAnswers(card, cards){
    var answers = []
    answers.push(card.back)
    if (cards.length == 2) {
      var otherCard = this.getOtherCard(cards, card);
      answers.push(otherCard.front, otherCard.back);
    }
    if (cards.length >= 3) {
      answers = this.getRandomCards(cards, card);
    }
    return answers;
  }

  getOtherCard(cards, card) {
    for (var i = cards.length-1; i > 0; i--) {
      if (cards[i] != card) {
        return cards[i];
      }
    }
  }

  getRandomCards(cards, card) {
    // cards = cards.splice(this.getPosition(cards, card), 1);
    var answers = [];
    var position = this.getRandomPosition(cards);
    answers.push(cards[position].back);
    cards = cards.splice(position, 1);
    position = this.getRandomPosition(cards);
    answers.push(cards[position].back);
    return answers;
  }

  getRandomPosition(cards) {
    var len = cards.length;
    var position = Math.floor(Math.random() * len);
    return position;
  }

  getPosition(cards, card) {
    for (var i = cards.length - 1; i >= 0; i--) {
      if (cards[i].id == card.id) {
        return i;
      }
    }
  }
}
