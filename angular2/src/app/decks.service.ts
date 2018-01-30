import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Deck } from './deck';

// const PEOPLE : Deck[] = [
//       {id: 1, name: 'Luke Skywalker', height: 177, weight: 70},
//       {id: 2, name: 'Darth Vader', height: 200, weight: 100},
//       {id: 3, name: 'Han Solo', height: 185, weight: 85},
//     ];

@Injectable()
export class DecksService{
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http : Http){}

  getAll(): Observable<Deck[]>{
    let decks$ = this.http
      .get(`${this.baseUrl}/decks`, { headers: this.getHeaders()})
      .map(mapDecks);
      return decks$;
  }

  // get(id: number): Deck {
  //   return
  // }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  get(id: number): Observable<Deck> {
    let deck$ = this.http
      .get(`${this.baseUrl}/decks/${id}`, {headers: this.getHeaders()})
      .map(mapDeck);
      debugger
      return deck$;
  }

  add_deck(deck) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // deck.user_id = 1
    debugger
    let body = JSON.stringify(deck);
    return this.http.post(`${this.baseUrl}/decks/`, body, options ).map((res: Response) => res.json());
  }

  save(deck: Deck) : Observable<Response>{
    // this won't actually work because the StarWars API
    // is read-only. But it would look like this:
    return this
      .http
      .put(`${this.baseUrl}/decks/${deck.id}`,
            JSON.stringify(deck),
            {headers: this.getHeaders()});
  }

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

// to avoid breaking the rest of our app
// I extract the id from the person url
// function extractId(deckData:any){
//   debugger;
//   let extractedId = deckData.url.replace('http://localhost:3000/api/v1/decks/','').replace('/','');
//   return parseInt(extractedId);
// }

function mapDeck(response:Response): Deck{
   return toDeck(response.json());
}
