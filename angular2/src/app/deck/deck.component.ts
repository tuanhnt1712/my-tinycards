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
  favoriteDecks = []
  following_people_decks = []
  trending_decks = []
  constructor(private decksService : DecksService){}

  ngOnInit(){
    this.decksService.getAll().then(data => {
      this.decks = data
      setTimeout(function(){
        $('.slick-slider').slick('refresh');
      },100);
    });

    this.decksService.getFavorites().then(data => {
      this.favoriteDecks = data
      setTimeout(function(){
        $('.slick-slider').slick('refresh');
      },100);
    });
    this.decksService.getByFollowingPeople().then(data => {
      this.following_people_decks = data
      setTimeout(function(){
        $('.slick-slider').slick('refresh');
      },100);
    });
    this.decksService.getByTrending().then(data => {
      this.trending_decks = data
      setTimeout(function(){
        $('.slick-slider').slick('refresh');
      },100);
    });
  }
}
