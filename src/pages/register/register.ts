import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private _backend: BackendProvider, private toastCtrl: ToastController) {
  }

  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  error: any

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  newRegister() {
    console.log('newRegister runs from RegisterPage', this.user)
    this._backend.register(this.user)
      .subscribe( (data: any) => {
        console.log('data from register subscribe', data)
      },
      err => {
        console.log('error caught in register:', err);
        this.error = err
      })

      if(!this.error) {
        this.navCtrl.setRoot(HomePage, {registered: this.user})
      } else {
        this.presentToast()
      }
  }

  

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Registration did not work, not my fault. Try again.',
      duration: 2000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
