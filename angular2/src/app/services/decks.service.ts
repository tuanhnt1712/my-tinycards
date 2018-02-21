import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Deck } from '../deck';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestBasicService } from './base/request-basic.service';

@Injectable()
export class DecksService extends RequestBasicService{
  getAll(): Promise<Deck[]>{
    let decks = this.http
      .get(`${this.baseUrl}/decks`, { headers: this.getHeaders()})
      .toPromise()
      .then(response => {
        return response.json().data['decks']
      })
      .catch(error => this.handleError(error));
    return decks;
  }

  get(id: number): Observable<Deck> {
    let deck$ = this.http
      .get(`${this.baseUrl}/decks/${id}`, {headers: this.getHeaders()})
      .map(mapDeck);
    return deck$;
  }

  add_deck(deck) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = deck;
    return this.http.post(`${this.baseUrl}/decks/`, body, options ).map((res: Response) => res.json());
  }
}

function mapDecks(response:Response): Deck[]{
  return response.json().data.decks
}

function toDeck(r:any): Deck{
  let deck = <Deck>({
    id: (r.id),
    user_id: r.user_id,
    title: r.title,
    description: r.description
  });
  return deck;
}

function mapDeck(response:Response): Deck{
  console.log(response.json())
   return toDeck(response.json().data);
}
