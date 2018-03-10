import { Component, Input, OnInit }  from '@angular/core';

import { LessonContentComponent } from './lesson-content.component';

@Component({
  template: `
    <div class="les-wrapper">
      <div class="les-choice">
        <div class="row">
          <div class="col-md-4">
            <div class="containerr" style="margin-bottom: 35px">
              <div class="ct-card">
                <div class="front" style="border-radius: 15px;">
                  <span> {{data.current_card.front}} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="answers">
              <ul>
                <li class="list-ans" *ngFor="let answer of answers" >
                  <button (click)="continue(answer)">{{answer}}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./lesson.component.css']
})
export class SingleChoiceQuestionComponent implements LessonContentComponent, OnInit {
  @Input() data: any;
  parent: any;
  lessons = [];
  cards = [];
  current_card: any;
  answers = [];

  ngOnInit() {
    this.current_card = this.data.current_card
    this.cards = this.data.cards
    this.answers = this.randomAnswers(this.current_card, this.cards);
  }

  continue(answer){
    if (this.current_card.back == answer) {
      console.log("Right");
      this.parent.point++;
      this.parent.nextCard();
    }else {
      console.log("Wrong");
      this.parent.point--;
      this.parent.current_card_index--;
    }
  }

  randomAnswers(card, cards){
    var answers = []
    if (cards.length == 2) {
      var otherCard = this.getOtherCard(cards, card);
      answers.push(otherCard.front, otherCard.back);
    }
    if (cards.length >= 3) {
      answers = this.getRandomCards(cards, card);
    }
    answers.push(card.back)
    this.shuffleArray(answers)
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

  shuffleArray = function(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
