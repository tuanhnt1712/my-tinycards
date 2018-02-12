import { Component, OnInit } from '@angular/core';
import { DecksService } from '../services/decks.service';
import { Observable } from 'rxjs/Observable';
import { Deck } from '../deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})

export class DeckComponent implements OnInit{
  decks: Promise<Deck[]>;

  constructor(private decksService : DecksService){}

  ngOnInit(){
    this.decks = this.decksService.getAll();
  }
}
