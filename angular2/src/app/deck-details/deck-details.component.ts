import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Deck } from '../deck';
import { DecksService } from '../services/decks.service';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css']
})
export class DeckDetailsComponent implements OnInit {
  deck: Deck;
  sub: any;

  constructor(private decksService: DecksService,
    private route: ActivatedRoute,
    private router: Router
   ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      console.log('getting person with id: ', id);
      this.decksService
        .get(id)
        .subscribe(p => this.deck = p);
    });
  }

}
