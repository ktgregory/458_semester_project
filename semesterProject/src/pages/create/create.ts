import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';


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

  stackid: string;
  stackname = '';
  cardIndex = 0;
  cardNumber = 1;
  totalCards = 0;
  cards = [];
  front = "";
  back = "";
  imageFront="";
  imageBack="";
  stackNotEmpty:Boolean;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private cardProv: CardProvider) {
    this.stackid = this.navParams.get('stackid');
    this.stackname = this.navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
    console.log(this.stackid);
    console.log(this.stackname);
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
          this.cardProv.deleteStackWithID(this.stackid);
          this.navCtrl.pop();
        }
      },
      {
        text: 'Nevermind.',
        handler: () => {
          console.log('Disagree clicked');
        }
      }
    ]});
    confirm.present()
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
    title: 'What this does!',
    subTitle: message,
    buttons: ['Okay']
  });
  alert.present();
  }

  async ngOnInit()
  {
    this.cards = await this.cardProv.getCardsByStackID(this.stackid);

    if(await this.cards.length==0)
     {
       this.stackNotEmpty = false;
     }
     else
     {
      this.stackNotEmpty = true;
      this.front = await this.cards[this.cardIndex].front;
      this.back = await this.cards[this.cardIndex].back;
      this.imageFront = this.cards[this.cardIndex].frontimage;
      this.imageBack = this.cards[this.cardIndex].backimage;
      this.totalCards = await this.cards.length;
    }
  }

  incrementCard()
  {
    this.cardIndex+=1;
    this.cardNumber+=1;
    this.front = this.cards[this.cardIndex].front;
    this.back = this.cards[this.cardIndex].back;
    this.imageFront = this.cards[this.cardIndex].frontimage;
    this.imageBack = this.cards[this.cardIndex].backimage;
  }

  decrementCard()
  {
    this.cardIndex-=1;
    this.cardNumber-=1;
    this.front = this.cards[this.cardIndex].front;
    this.back = this.cards[this.cardIndex].back;
    this.imageFront = this.cards[this.cardIndex].frontimage;
    this.imageBack = this.cards[this.cardIndex].backimage;

  }
}
