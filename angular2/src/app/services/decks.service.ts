import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Deck } from '../deck';
import { Lesson } from '../lesson';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestBasicService } from './base/request-basic.service';

@Injectable()
export class DecksService extends RequestBasicService{
  private searchCaseNumberFirst = [];
  public searchCaseNumber = new Subject<any>();

  searchCaseNumber$ = this.searchCaseNumber.asObservable();

  publishData(data) {
    this.searchCaseNumberFirst = data;
    this.searchCaseNumber.next(data);
  }

  fetch() {
    return this.searchCaseNumberFirst;
  }

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

  searchDeck(key): Promise<Deck[]>{
    let decks = this.http
      .get(`${this.baseUrl}/search/decks?key=${key}`, { headers: this.getHeaders()})
      .toPromise()
      .then(response => {
        return response.json().data['decks']
      })
      .catch(error => this.handleError(error));
    return decks;
  }
  getFavorites(): Promise<Deck[]>{
    let decks = this.http
      .get(`${this.baseUrl}/favorite/decks`, { headers: this.getHeaders()})
      .toPromise()
      .then(response => {
        return response.json().data['decks']
      })
      .catch(error => this.handleError(error));
    return decks;
  }
  getByFollowingPeople(): Promise<Deck[]>{
    let decks = this.http
      .get(`${this.baseUrl}/following_people/decks`, { headers: this.getHeaders()})
      .toPromise()
      .then(response => {
        return response.json().data['decks']
      })
      .catch(error => this.handleError(error));
    return decks;
  }
  getByTrending(): Promise<Deck[]>{
    let decks = this.http
      .get(`${this.baseUrl}/trending/decks`, { headers: this.getHeaders()})
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

  import_deck(form) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = form;
    return this.http.post(`${this.baseUrl}/import/decks/`, body, options ).map((res: Response) => res.json());
  }

  feed_back(user_id, deck_id, status) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = {user_id: user_id, deck_id: deck_id, status: status};
    return this.http.post(`${this.baseUrl}/feed_backs/`, body, options ).map((res: Response) => res.json());
  }

  add_deck(deck) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = deck;
    return this.http.post(`${this.baseUrl}/decks/`, body, options ).map((res: Response) => res.json());
  }

  update_deck(deck) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = deck;
    return this.http.put(`${this.baseUrl}/decks/${deck.id}`, body, options ).map((res: Response) => res.json());
  }

  deleteDeck(id) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.baseUrl}/decks/${id}`, options)
  }

  create_user_lesson(user_lesson) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = user_lesson;
    return this.http.post(`${this.baseUrl}/user_lessons/`, body, options ).map((res: Response) => res.json());
  }

  favorite(deck_id) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = {deck_id: deck_id};
    return this.http.post(`${this.baseUrl}/favorites/`, body, options ).map((res: Response) => res.json());
  }

  unFavorite(deck_id) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = {deck_id: deck_id};
    return this.http.post(`${this.baseUrl}/remove/favorites/`, body, options ).map((res: Response) => res.json());
  }

  get_lesson(id: number) {
    let lesson$ = this.http
    .get(`${this.baseUrl}/lessons/${id}`, {headers: this.getHeaders()})
      .map(mapLesson);
    return lesson$;
  }
}

function mapDecks(response:Response): Deck[]{
  return response.json().data.decks
}

function toDeck(r:any): Deck{
  let deck = <Deck>({
    id: (r.id),
    user_id: r.user_id,
    user_name: r.user_name,
    title: r.title,
    description: r.description,
    cover_image: r.cover_image,
    cards: r.cards,
    lessons: r.lessons,
    favorite_count: r.favorite_count,
    favorited: r.favorited
  });
  return deck;
}

function toLesson(r:any): Lesson{
  let lesson = <Lesson>({
    id: (r.id),
    deck_id: (r.deck_id),
    cards: r.cards
  });
  return lesson;
}

function mapDeck(response:Response): Deck{
  return toDeck(response.json().data);
}

function mapLesson(response:Response){
  return toLesson(response.json().data);
}
