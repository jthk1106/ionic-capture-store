import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage'; 
//import { SpeakPage } from '../speak/speak';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _backend: BackendProvider, private toastCtrl: ToastController, private storage: Storage) {

  }

  getId: any
  getToken: any
  firstName: any
  lastName: any
  loggedIn: any

  user: any = {
    email: '',
    password: ''
  }

  newLogin() {
    this._backend.login(this.user)
      .subscribe( (data: any) => {
        console.log('data in subscribe from LoginPage', data)
        this.getId = data.userId
        this.getToken = data.token
        this.loggedIn = true
        this.goGetName()/*.then(_ => {
          this.successToast()
        })
        */
        //this.successToast() works fine here
        this.storage.set('id', this.getId);
        this.storage.set('token', this.getToken);
        //this.navCtrl.setRoot(SpeakPage)
      },
      err => {
        console.error('error from login:', err.message)
        this.presentToast()
      }
      /*
      ,
      () => {
        //subscribe can take a 3rd parameter
        
        this.goGetName().then(_ => {
          this.successToast()
        })
      }
      */
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

  goGetName() {
    this._backend.getName(this.getId, this.getToken)
      .subscribe((data: any) => {
        console.log('goGetName() subscribe from HomePage', data)
        this.firstName = data.firstName
        this.lastName = data.lastName
        console.log('check if name came back:', this.firstName)
        this.successToast()
      })
      return this.lastName
  }

  successToast() {
    let toast = this.toastCtrl.create({
      message: 'Hi ' + this.firstName + ' ' + this.lastName + '!',
      duration: 2000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  goLogout() {
    console.log('goLogout() runs')
    this._backend.logout(this.getToken)
    .subscribe((data: any) => {
      console.log(data)
      this.loggedIn = false
    })
  }

}   
  