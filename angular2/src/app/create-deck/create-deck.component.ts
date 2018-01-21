import { Component, OnInit } from '@angular/core';
import { DecksService } from '../decks.service';
import { Deck } from '../deck';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent {

  constructor(decksService: DecksService) { }


  createDeck(title, description) {
    let deck = {title: name, description: description};
    this.decksService.add_deck(deck).subscribe(
       data => {
         // refresh the list
         this.getAll();
         return true;
       }
    );
  }

}
