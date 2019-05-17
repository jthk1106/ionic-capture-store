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
    this._backend.register(this.user)
      .subscribe( (data: any) => {
      },
      err => {
      console.error('err from register:', err.message)
      this.presentToast()
      },
      () => {
      this.navCtrl.setRoot(HomePage, {registered: this.user})
      }) 
  }

  

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Registration didn't work. Not my fault so try again or something. (Try a different login email)",
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
