import { Component, OnInit, Input } from '@angular/core';
import { DecksService } from '../services/decks.service';
import { Observable } from 'rxjs/Observable';
import { Deck } from '../deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})

export class DeckComponent implements OnInit{
  decks = [];

  constructor(private decksService : DecksService){}

  ngOnInit(){
    this.decksService.getAll().then(data => {
     this.decks = data
     setTimeout(function(){
      $('.slick-slider').slick('refresh');
     },100);
    });
  }
}
