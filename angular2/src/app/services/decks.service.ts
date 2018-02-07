import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Deck } from '../deck';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderBasicService } from './base/header-basic.service';

@Injectable()
export class DecksService {
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private router: Router
  ){}

  private getAccess(){
    if (JSON.parse(localStorage.getItem('currentUser')) == null)
      this.router.navigate(['/login']);
    else
      return JSON.parse(localStorage.getItem('currentUser')).token
  }

  getAll(): Promise<Deck[]>{
    let decks = this.http
      .get(`${this.baseUrl}/decks`, { headers: this.authenticationService.getHeaders()})
      .toPromise()
      .then(response => {
        return response.json().data['decks']
      })
      .catch(error => this.authenticationService.handleError(error));
    return decks;
  }

  get(id: number): Observable<Deck> {
    let deck$ = this.http
      .get(`${this.baseUrl}/decks/${id}`, {headers: this.authenticationService.getHeaders()})
      .map(mapDeck);
    return deck$;
  }

  add_deck(deck) {
    let headers = this.authenticationService.getHeaders();
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
