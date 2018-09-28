import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  firstname = "Katie";
  lastname = "Gregory"
  email = "kcgregor@go.olemiss.edu";
  school = "University of Mississippi";


  constructor(public navCtrl: NavController) {

  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }
  

}

