import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { SelectPage } from '../select/select';

/**
 * Generated class for the NewcardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newcards',
  templateUrl: 'newcards.html',
})
export class NewcardsPage {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewcardsPage');
  }

  goToSelectPage()
  {
    this.navCtrl.push(SelectPage);
  }

  goToCreatePage()
  {
    const prompt = this.alertCtrl.create({
      title: 'Create a New Stack!',
      message: "Enter a name for this new stack:",
      inputs: [
        {
          name: 'stacktitle',
          placeholder: 'Stack Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create!',
          handler: data => {
            this.navCtrl.push(CreatePage);
          }
        }
      ]
    });
    prompt.present();
  }  

}
