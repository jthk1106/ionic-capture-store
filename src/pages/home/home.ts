import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _backend: BackendProvider) {

  }

  user: any = {
    email: '',
    password: ''
  }

  newLogin() {
    this._backend.login(this.user)
      .subscribe( (data: any) => {
        console.log('data in subscribe from LoginPage', data)
      })
  }

}
