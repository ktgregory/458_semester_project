import { Component } from '@angular/core';

import { ViewPage } from '../view/view';
import { HomePage } from '../home/home';
import { NewcardsPage } from '../newcards/newcards';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ViewPage;
  tab3Root = NewcardsPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
