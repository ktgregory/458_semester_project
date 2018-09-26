import { Component } from '@angular/core';

import { ViewPage } from '../view/view';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { EditPage } from '../edit/edit';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;
  tab3Root = ViewPage;
  tab4Root = EditPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
