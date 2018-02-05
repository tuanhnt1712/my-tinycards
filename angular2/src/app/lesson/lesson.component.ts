import { Component, OnInit } from '@angular/core';
import { DecksService } from '../services/decks.service';
import { Deck } from '../deck';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

	deck: Deck;

  constructor(private decksService: DecksService) { }

  ngOnInit() {
  	// this.sub = this.route.params.subscribe(params => {
      // let id = Number.parseInt(params['id']);
      console.log('getting person with id: ', 1);
      this.decksService
        .get(1)
        .subscribe(p => this.deck = p);
        console.log(this.deck);
    // });
  }

  random_card(card, cards){
  	var array = []
  	if cards.lenght() == 2 {
  		array.push(card.back)
  		otherCard = this.getOtherCard(cards, card);
  		array.push(card.front);
  		array.push(card.back);
  	}
  }

  getOtherCard(cards, card) {
  	for (var i = cards.length - 1; i >= 0; i--) {
  		if cards[i] != card {
  			return cards[i];
  		}
  	}
  }
}
