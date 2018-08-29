import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage'; 

/**
 * Generated class for the SpeakPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speak',
  templateUrl: 'speak.html',
})
export class SpeakPage {

  selection: any = 'en-US'
  us: any = 'en-US'
  uk: any = 'en-GB'
  text: any
  texts: any = []
  speed: any = 100
  adjustSpeed: any = this.speed/10

  constructor(public navCtrl: NavController, public navParams: NavParams, private tts: TextToSpeech, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakPage');
  }

  say() {
    this.tts.speak({
      text: this.text,
      locale: this.selection,
      rate: this.adjustSpeed
  }).then(function () {
      alert('success');
  }, function (reason) {
      alert(reason);
  })
  }

  save() {
    this.texts.push(this.text)
    console.log('texts:', this.texts)
    //this.storage.set('savedText', this.texts)
  }

  clear() {
    this.texts = []
  }
}
