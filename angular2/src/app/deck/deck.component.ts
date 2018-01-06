import { Component, OnInit } from '@angular/core';
import { Http }      from '@angular/http';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  ngOnInit() {
  }
  decks = [];
  constructor(private http:Http) {
    this.getDecks();
  }

  getDecks() {
    this.http.get('http://localhost:3000/decks')
             .subscribe(res => {
               this.decks = res.json().decks;
             });
  }

}
