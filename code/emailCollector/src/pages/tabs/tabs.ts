import { Component } from '@angular/core';

import { SignupPage } from '../signup/signup';
import { ExportPage } from '../export/export';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SignupPage;
  tab2Root: any = ExportPage;
  
  constructor() {

  }
}
