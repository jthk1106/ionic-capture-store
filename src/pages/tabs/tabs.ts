import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { CapturePage } from '../capture/capture';
import { SpeakPage } from '../speak/speak';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage
  tab2Root = AboutPage
  tab4Root = RegisterPage
  tab5Root = CapturePage
  tab6Root = SpeakPage

  constructor() {

  }
}
