import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }
  
  emailValidate(user: User) {
    return this.http.post(`http://localhost:3000/emailValidate`, user);
  }

  passwordValidate(accessToken: string, password: string){
    return this.http.post(`http://localhost:3000/passwordValidate`, { accessToken, password });
    // return this.http.post(`http://localhost:3000/emailValidate`, user);
  }
}

