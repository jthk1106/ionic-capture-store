import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { CapturePage } from '../capture/capture';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage
  tab2Root = AboutPage
  tab3Root = ContactPage
  tab4Root = RegisterPage
  tab5Root = CapturePage

  constructor() {

  }
}
