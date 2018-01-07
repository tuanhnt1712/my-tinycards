// import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions, Headers } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

// import { Deck } from './deck';

// @Injectable()
// export class DecksService{
//   private baseUrl: string = 'http://localhost:3000/api/v1';

//   constructor(private http : Http){}

//   getAll(): Observable<Deck[]>{
//     let decks$ = this.http
//       .get(`${this.baseUrl}/decks`, { headers: this.getHeaders()})
//       .map(mapDecks);
//       return decks$;
//   }

//   private getHeaders(){
//     // I included these headers because otherwise FireFox
//     // will request text/html
//     let headers = new Headers();
//     headers.append('Accept', 'application/json');
//     return headers;
//   }
//   // get(id: number): Observable<Deck> {
//   //   let person$ = this.http
//   //     .get(`${this.baseUrl}/decks/${id}`, {headers: this.getHeaders()})
//   //     .map(mapDeck);
//   //     return person$;
//   // }

//   // save(person: Deck) : Observable<Response>{
//   //   // this won't actually work because the StarWars API 
//   //   // is read-only. But it would look like this:
//   //   return this
//   //     .http
//   //     .put(`${this.baseUrl}/people/${person.id}`,
//   //           JSON.stringify(person),
//   //           {headers: this.getHeaders()});
//   // }

// }


// function mapDecks(response:Response): Deck[]{
//   // The response of the API has a results
//   // property with the actual results
//   return response.json().results.map(toDeck)
// }

// function toDeck(r:any): Deck{
//   let deck = <Deck>({
//   	 id: extractId(r),
//     description: r.description,
//     title: r.title
//   });
//   console.log('Parsed person:', deck);
//   return deck;
// }

// // to avoid breaking the rest of our app
// // I extract the id from the person url
// function extractId(personData:any){
//   let extractedId = personData.url.replace('localhost:3000/api/decks/','').replace('/','');
//   return parseInt(extractedId);
// }

// function mapDeck(response:Response): Deck{
//    // toPerson looks just like in the previous example
//    return toDeck(response.json());
// }





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
  private baseUrl: string = 'http://localhost:3000/api/v1';

  constructor(private http : Http){}

  getAll(): Observable<Deck[]>{
    let decks$ = this.http
      .get(`${this.baseUrl}/decks`, { headers: this.getHeaders()})
      .map(mapDecks);
      return decks$;
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  get(id: number): Observable<Deck> {
    let deck$ = this.http
      .get(`${this.baseUrl}/decks/${id}`, {headers: this.getHeaders()})
      .map(mapDeck);
      return deck$;
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
  debugger
  return response.json()
}

function toDeck(r:any): Deck{
  let deck = <Deck>({
    id: extractId(r),
    user_id: r.user_id,
    title: r.title,
    description: r.description
  });
  return deck;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(personData:any){
  let extractedId = personData.url.replace('http://localhost:3000/api/v1/decks/','').replace('/','');
  return parseInt(extractedId);
}

function mapDeck(response:Response): Deck{
   // toPerson looks just like in the previous example
   return toDeck(response.json());
}