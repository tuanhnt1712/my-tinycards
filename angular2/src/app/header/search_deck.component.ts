import { Component, OnInit, Input } from '@angular/core';
import { DecksService } from '../services/decks.service';

@Component({
  selector: 'search-deck',
  templateUrl: './search_deck.component.html',
  styleUrls: ['./search_deck.component.css']
})
export class SearchDeckComponent implements OnInit {
  search_decks = [];

  constructor(private decksService: DecksService) {
  }

  ngOnInit() {
    const self = this;
    this.search_decks = this.decksService.fetch();
    self.decksService.searchCaseNumber$.subscribe(
      state => {
        self.search_decks = state
      }
    );
  }
}
