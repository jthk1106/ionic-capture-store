import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _backend: BackendProvider, private toastCtrl: ToastController) {

  }

  user: any = {
    email: '',
    password: ''
  }

  newLogin() {
    this._backend.login(this.user)
      .subscribe( (data: any) => {
        console.log('data in subscribe from LoginPage', data)
      },
      err => {
        console.error('error from login:', err)
        this.presentToast()
      },
      () => {
        this.successToast()
      }
    )
  }

  goRegister() {
    this.navCtrl.push(RegisterPage)
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Login did not work, not my fault. Try again.',
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  successToast() {
    let toast = this.toastCtrl.create({
      message: 'You are logged in!',
      duration: 2000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}   
  