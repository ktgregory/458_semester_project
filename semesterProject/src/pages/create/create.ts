import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  public cardForm: FormGroup;

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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,
    public navParams: NavParams, private cardProv: CardProvider,
    public FormBuilder: FormBuilder,) {
    this.stackid = this.navParams.get('stackid');
    this.stackname = this.navParams.get('name');

    this.cardForm = FormBuilder.group({
      front: [''],
      frontImg: [''],
      back: [''],
      backImg: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
    console.log(this.stackid);
    console.log(this.stackname);
  }

  existingCard() {
    if (this.cardIndex < this.totalCards){
      return true;
    }
    return false;
  }

  save(){
    console.log(this.cardForm)
    if (this.existingCard()){
      this.cardProv.editCard(this.cardForm.value.back, this.cardForm.value.backImg, this.cards[this.cardIndex].cardid, this.cardForm.value.front, this.cardForm.value.frontImg);
    }
    else{
      this.cardProv.createCard(this.stackid, this.cardForm.value.back, this.cardForm.value.backImg, this.cardForm.value.front, this.cardForm.value.frontImg);
    }

    this.refresh();
    //let currentCard = this.cards[this.cardIndex];
    //let id = currentCard.cardid;
    //let 
    //this.cardProv.editCard();
    //this.navCtrl.pop();
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
      console.log(this.totalCards);
    }
  }

  incrementCard()
  {
    this.cardIndex+=1;
    this.cardNumber+=1;
    console.log(this.existingCard());
    if(this.existingCard()){
      this.front = this.cards[this.cardIndex].front;
      this.back = this.cards[this.cardIndex].back;
      this.imageFront = this.cards[this.cardIndex].frontimage;
      this.imageBack = this.cards[this.cardIndex].backimage;
    }
    else {
      this.addCard();
    }
    console.log(this.cardIndex);
  }

  addCard(){
    this.front = '';
    this.back = '';
    this.imageFront = '';
    this.imageBack = '';
  }

  decrementCard()
  {
    this.cardIndex-=1;
    this.cardNumber-=1;
    this.front = this.cards[this.cardIndex].front;
    this.back = this.cards[this.cardIndex].back;
    this.imageFront = this.cards[this.cardIndex].frontimage;
    this.imageBack = this.cards[this.cardIndex].backimage;
    
    console.log(this.cardIndex);

  }

  refresh(){
    this.navCtrl.pop();
    this.navCtrl.push(CreatePage,
      {stackid: this.stackid,
        name: this.stackname});
  }

  deleteCard(){
    this.cardProv.deleteCard(this.cards[this.cardIndex].cardid);
    this.refresh();
  }
}
