import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../user'

@Injectable()
export class UserService {

  constructor(private http : Http) { }

  create(user: User) {
    return this.http.post('http://localhost:3000/api/auth/users', user);
  }
}
