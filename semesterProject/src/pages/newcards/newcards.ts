import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { SelectPage } from '../select/select';
import { CardProvider } from '../../providers/card/card';
import { AngularFirestore } from 'angularfire2/firestore';


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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private cardProv: CardProvider, private afs: AngularFirestore) {
  }

  stackname = '';

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
          name: 'name',
          placeholder: 'Stack Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Create!',
          handler:  data=> {
            let id = this.afs.createId();
            this.cardProv.createNewStack(data.name, id).then(()=>
            {
              this.navCtrl.push(CreatePage, {stackid:id, name:data.name});
            });
          }
        }
      ]
    });
    prompt.present();
  }  

}
