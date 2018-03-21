import { Component, OnInit, Input } from '@angular/core';
import { DecksService } from '../services/decks.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'search-deck',
  templateUrl: './search_deck.component.html',
  styleUrls: ['./search_deck.component.css']
})
export class SearchDeckComponent implements OnInit {
  search_decks = [];

  constructor(private decksService: DecksService, private router: Router,
    private activeedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    const self = this;
    this.search_decks = this.decksService.fetch();
    self.decksService.searchCaseNumber$.subscribe(
      state => {
        self.search_decks = state
      }
    );

    this.activeedRouter.queryParams.subscribe((params) => {
      var text = params['q']
      this.decksService.searchDeck(text).then(data => {
        this.decksService.publishData(data);
        this.router.navigate(['/search'], {queryParams: { q: text}});
      });
  });
  }
}
