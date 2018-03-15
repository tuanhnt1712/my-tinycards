import { Injectable } from '@angular/core';
import { RequestBasicService } from './base/request-basic.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../user'

@Injectable()
export class UserService extends RequestBasicService{
	getUser(id: number): Observable<User> {
    let user$ = this.http
      .get(`${this.baseUrl}/auth/users/${id}`, {headers: this.getHeaders()})
      .map(mapUser);
    return user$;
  }
}

function toUser(r:any): User{
  let user = <User>({
    id: (r.id),
    name: r.name,
    email: r.email,
    avatar: r.avatar,
    bio: r.bio,
    decks: r.decks
  });
  return user;
}

function mapUser(response:Response): User{
  console.log(response.json().data)
  return toUser(response.json().data);
}