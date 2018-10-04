import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  Save(){
    this.navCtrl.pop();
  }
 
leave()
{
  let confirm = this.alertCtrl.create({
    title: 'Done?',
    message: 'If you haven\'t added the current card, your progress will be lost!',
    buttons: [
      {
        text: 'Yes, leave!',
        handler: () => {
          this.navCtrl.pop();
        }
      },
      {
        text: 'No, stay!',
        handler: () => {
          console.log('Disagree clicked');
        }
      }
    ]
  });
  confirm.present()
}

deleteStack()
{
  let confirm = this.alertCtrl.create({
    title: 'Delete this stack?',
    message: 'This action cannot be undone!',
    buttons: [
      {
        text: 'Yes, delete!',
        handler: () => {
          this.navCtrl.pop();
        }
      },
      {
        text: 'Nevermind.',
        handler: () => {
          console.log('Disagree clicked');
        }
      }
    ]
  });
  confirm.present()
}
  

}
