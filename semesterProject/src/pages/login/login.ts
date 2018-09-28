import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm:FormGroup;

  constructor(public navCtrl: NavController,  public formBuilder: FormBuilder) {

  }

  goToTabs()
  {
    this.navCtrl.push(TabsPage);
  }

  loginUser()
  {

  }

  goToResetPassword()
  {

  }

  createAccount()
  {
    this.navCtrl.push(SignupPage);
  }
}
