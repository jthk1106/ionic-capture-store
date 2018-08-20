import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { HomePage } from '../home/home';
//import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private _backend: BackendProvider) {
  }

  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  newRegister() {
    console.log('newRegister runs from RegisterPage', this.user)
    this._backend.register(this.user)
      .subscribe( (data: any) => {
        console.log('data from register subscribe', data)
      },
      error => {
        console.log('subscribe error:', error);
      })

    this.navCtrl.setRoot(HomePage, {registered: this.user})
  }

}
