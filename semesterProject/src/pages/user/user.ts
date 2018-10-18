import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  firstname = "Katie";
  lastname = "Gregory"
  email = "kcgregor@go.olemiss.edu";
  school = "University of Mississippi";


  constructor(public navCtrl: NavController, private auth: AuthProvider) {

  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }
  
logoutUser()
  {
    console.log("logging out");
    this.auth.logoutUser();
    window.location.reload();
  }

}

