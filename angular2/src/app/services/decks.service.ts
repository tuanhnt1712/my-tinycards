import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthenticationService } from '../services/authentication.service';
import { Deck } from '../deck';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class DecksService{
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http : Http,
              private authenticationService: AuthenticationService,
              private router: Router
  ){}

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Doorkeeper-Token', 'Bearer ' + this.getAccess())
    return headers;
  }

  private getAccess(){
    debugger
    if (JSON.parse(localStorage.getItem('currentUser')) == null)
      this.router.navigate(['/login']);
    else
      return JSON.parse(localStorage.getItem('currentUser')).token
  }

  getAll(): Observable<Deck[]>{
    let decks$ = this.http
      .get(`${this.baseUrl}/decks`, { headers: this.getHeaders()})
      .map(mapDecks);
      return decks$;
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
