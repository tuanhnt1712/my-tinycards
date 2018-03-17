import { Injectable } from '@angular/core';
import { RequestBasicService } from './base/request-basic.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../user'

@Injectable()
export class UserService extends RequestBasicService{
	getUser(id: number): Observable<User> {
    let user$ = this.http
      .get(`${this.baseUrl}/profile/users/${id}`, {headers: this.getHeaders()})
      .map(mapUser);
    return user$;
  }

  getUserEdit(id: number): Observable<User> {
    let user$ = this.http
      .get(`${this.baseUrl}/auth/users/${id}/edit`, {headers: this.getHeaders()})
      .map(mapUser);
    return user$;
  }

  follow(user_id) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = {follower_id: user_id};
    return this.http.post(`${this.baseUrl}/relationships/`, body, options ).map((res: Response) => res.json());
  }

  unFollow(user_id) {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    let body = {follower_id: user_id};
    return this.http.post(`${this.baseUrl}/remove/relationships/`, body, options ).map((res: Response) => res.json());
  }
}

function toUser(r:any): User{
  let user = <User>({
    id: (r.id),
    name: r.name,
    email: r.email,
    avatar: r.avatar,
    bio: r.bio,
    decks: r.decks,
    followed: r.followed,
    follower_number: r.follower_number,
    following_number: r.following_number,
    following: r.following,
    followers: r.followers,
  });
  return user;
}

function mapUser(response:Response): User{
  console.log(response.json().data)
  return toUser(response.json().data);
}
