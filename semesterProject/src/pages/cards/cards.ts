import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController) {

  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'What this does!',
      subTitle: message,
      buttons: ['Okay']
    });
    alert.present();
  }

}
