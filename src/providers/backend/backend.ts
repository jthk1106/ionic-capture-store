import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the BackendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackendProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BackendProvider Provider');
  }

  registerUrl: any = 'http://localhost:3000/api/appUsers'
  loginUrl: any = 'http://localhost:3000/api/appUsers/login'
  logoutUrl: any = 'http://localhost:3000/api/appUsers/logout'

  register(user) {
    return this.http.post(this.registerUrl, user)
  }

  login(user) {
    return this.http.post(this.loginUrl, user)
  }

  logout(user) {
    return this.http.post(this.logoutUrl, user)
  }

}
