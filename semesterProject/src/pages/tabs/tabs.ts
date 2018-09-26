import { Component } from '@angular/core';

import { ViewPage } from '../view/view';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { NewcardsPage } from '../newcards/newcards';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;
  tab3Root = ViewPage;
  tab4Root = NewcardsPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
