import { Component, OnInit } from '@angular/core';
import { DecksService } from '../decks.service';
import { Deck } from '../deck';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent implements OnInit{
  deck: Deck;

  constructor(private decksService: DecksService) { }

  ngOnInit(){
  }

  createDeck(title, description) {
    let deck = {user_id: 1, title: title, description: description};
    debugger
    this.decksService.add_deck(deck).subscribe(
       data => {
         return true;
       }
    );
  }
}
