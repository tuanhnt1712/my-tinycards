import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Deck } from '../deck';
import { Lesson } from '../lesson';

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

  create_user_lesson(user_lesson) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = user_lesson;
    return this.http.post(`${this.baseUrl}/user_lessons/`, body, options ).map((res: Response) => res.json());
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
    title: r.title,
    description: r.description,
    cover_image: r.cover_image,
    cards: r.cards,
    lessons: r.lessons
  });
  return deck;
}

function toLesson(r:any): Lesson{
  let lesson = <Lesson>({
    id: (r.id),
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
