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

  //registerUrl: any = 'http://jeremy-spring-2018-phortonssf.c9users.io:8080/api/appUsers'
  registerUrl: any = 'http://localhost:3000/api/appUsers'
  //loginUrl: any = 'http://jeremy-spring-2018-phortonssf.c9users.io:8080/api/appUsers/login'
  loginUrl: any = 'http://localhost:3000/api/appUsers/login'
  //logoutUrl: any = 'http://jeremy-spring-2018-phortonssf.c9users.io:8080/api/appUsers/logout?access_token='
  logoutUrl: any = 'http://localhost:3000/api/appUsers/logout'
  //getNameUrl1: any = 'http://jeremy-spring-2018-phortonssf.c9users.io:8080/api/appUsers/'
  getNameUrl1: any = 'http://localhost:3000/api/appUsers/'
  getNameUrl2: any = '?access_token='

  register(user) {
    console.log('register() runs from backend provider')
    return this.http.post(this.registerUrl, user)
  }

  login(user) {
    return this.http.post(this.loginUrl, user)
  }

  getName(id, token) {
    return this.http.get(this.getNameUrl1 + id + this.getNameUrl2 + token)
  }

  logout(token) {
    return this.http.post(this.logoutUrl + token, {})
  }

}
