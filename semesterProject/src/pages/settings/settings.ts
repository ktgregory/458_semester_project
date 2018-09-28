import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {


  firstname = "Katie";
  lastname = "Gregory"
  email = "kcgregor@go.olemiss.edu";
  age = "21";
  school = "University of Mississippi";


  constructor(public navCtrl: NavController) {

  }


}
