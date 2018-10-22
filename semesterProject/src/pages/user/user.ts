import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { ChangepasswordPage } from '../changepassword/changepassword';

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

  
  async ngOnInit() 
  {
  // runs when page is loaded 
  // (for async functions that cant run in constructor, ie user provider functions)

  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }
  
  goToChangePassword() {
    this.navCtrl.push(ChangepasswordPage);
  }
  
logoutUser()
  {
    this.auth.logoutUser();
    window.location.reload();
  }

}

