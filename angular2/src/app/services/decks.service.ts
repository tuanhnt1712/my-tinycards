import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthenticationService } from '../services/authentication.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Deck } from '../deck';

@Injectable()
export class DecksService{
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http : Http,
              private authenticationService: AuthenticationService){}

  getAll(): Observable<Deck[]>{
    debugger
    let decks$ = this.http
      .get(`${this.baseUrl}/decks`, { headers: this.getHeaders()})
      .map(mapDecks);
      return decks$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Doorkeeper-Token', 'Bearer ' + this.authenticationService.token)
    return headers;
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

  // save(deck: Deck) : Observable<Response>{
  //   return this
  //     .http
  //     .put(`${this.baseUrl}/decks/${deck.id}`,
  //           JSON.stringify(deck),
  //           {headers: this.getHeaders()});
  // }
}


function mapDecks(response:Response): Deck[]{
  return response.json()
}

function toDeck(r:any): Deck{
  let deck = <Deck>({
    id: r.id,
    user_id: r.user_id,
    title: r.title,
    description: r.description
  });
  return deck;
}


function mapDeck(response:Response): Deck{
   return toDeck(response.json());
}
