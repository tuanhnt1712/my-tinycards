import { Component, OnInit } from '@angular/core';
import { DecksService } from '../services/decks.service';
import { Lesson } from '../lesson';
import { FormWizardModule } from 'angular2-wizard';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

	lesson: Lesson;

  constructor(private decksService: DecksService) { }

  ngOnInit() {
    var a = {
      back:"hi",
      front:"chao",
      id:1
    }

    var b = [{
      back:"hi",
      front:"chao",
      id:2
    },
    {
      back:"bye",
      front:"tambiet",
      id:1
    },
    {
      back:"love",
      front:"yeu",
      id:3
    }]
  	// this.sub = this.route.params.subscribe(params => {
      // let id = Number.parseInt(params['id']);
      console.log('getting person with id: ', 1);
      const self = this;
       this.decksService
        .get_lesson(1)
        .subscribe(function(p){ 
          self.randomAnswers(p.cards[0], p.cards);
          debugger;
        })

    // this.randomAnswers(a, b);
    // this.getOtherCard(b,a);
    // });
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

  // random_card(card, cards){
  // 	var array = []
  // 	if (cards.lenght() == 2) {
  // 		array.push(card.back)
  // 		let otherCard = this.getOtherCard(cards, card);
  // 		array.push(card.front);
  // 		array.push(card.back);
  // 	}
  // }

  // getOtherCard(cards, card) {
  // 	for (var i = cards.length - 1; i >= 0; i--) {
  // 		if (cards[i] != card) {
  // 			return cards[i];
  // 		}
  // 	}
  // }
}
