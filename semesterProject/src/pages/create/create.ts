import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

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
  loading:Loading;
  cardID;
  newCard=false;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,
    public navParams: NavParams, private cardProv: CardProvider,
    public FormBuilder: FormBuilder, public loadingCtrl:LoadingController,
    private storage: AngularFireStorage, private afs:AngularFirestore) {
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

  }

  existingCard() {
    if (this.newCard)
      return false;
    if (this.cardIndex < this.totalCards){
      return true;
    }
    return false;
  }

  save(){
    if (this.existingCard()){
      this.cardProv.editCard(this.cardForm.value.back, this.cardForm.value.backImg, this.cards[this.cardIndex].cardid, this.cardForm.value.front, this.cardForm.value.frontImg);
    }
    else{
      this.cardProv.createCard(this.cardID, this.stackid, this.cardForm.value.back, this.imageBack, this.cardForm.value.front, this.imageFront);
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
          if(!this.existingCard()) this.deleteCard(true);
          this.navCtrl.pop();
        }
      },
      {
        text: 'No, stay!'
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
        text: 'Nevermind.'
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
       this.newCard=true;
       this.addCard();
     }
     else
     {
      this.newCard=false;
      this.stackNotEmpty = true;
      this.front = await this.cards[this.cardIndex].front;
      this.back = await this.cards[this.cardIndex].back;
      this.imageFront = this.cards[this.cardIndex].frontimage;
      this.imageBack = this.cards[this.cardIndex].backimage;
      this.totalCards = await this.cards.length;
      this.cardID = await this.cards[this.cardIndex].cardid;
    }
  }

  incrementCard()
  {
    this.cardIndex+=1;
    this.cardNumber+=1;
    if(this.existingCard()){
      this.front = this.cards[this.cardIndex].front;
      this.back = this.cards[this.cardIndex].back;
      this.imageFront = this.cards[this.cardIndex].frontimage;
      this.imageBack = this.cards[this.cardIndex].backimage;
      this.cardID = this.cards[this.cardIndex].cardid;
      this.newCard=false;
    }
    else {
      this.newCard=true;
      this.addCard();
    }
  }

  async addCard(){
    this.front = '';
    this.back = '';
    this.imageFront = '';
    this.imageBack = '';
    this.cardID = await this.afs.createId();
    this.newCard=true;
    await this.cardProv.createCard(this.cardID, this.stackid, this.back, this.imageBack, this.front, this.imageFront);
  }

  decrementCard()
  {
    this.newCard=false;
    this.cardIndex-=1;
    this.cardNumber-=1;
    this.front = this.cards[this.cardIndex].front;
    this.back = this.cards[this.cardIndex].back;
    this.imageFront = this.cards[this.cardIndex].frontimage;
    this.imageBack = this.cards[this.cardIndex].backimage;
    this.cardID = this.cards[this.cardIndex].cardid;
  }

  refresh(){
    this.navCtrl.pop();
    this.navCtrl.push(CreatePage,
      {stackid: this.stackid,
        name: this.stackname});
  }

  deleteCard(fromLeave:boolean){
    this.cardProv.deleteCard(this.cardID);
    if(this.imageFront!="") this.storage.ref("images/"+this.cardID+"1").delete();
    if(this.imageBack!="") this.storage.ref("images/"+this.cardID+"2").delete();
    if(!fromLeave)
      this.refresh();
  }


  async uploadImage(event:FileList, side:Number)
  {
    let file = event.item(0);
    if (file.type.split('/')[0] !== 'image') { 
      this.presentErrorMessage("You have selected an unsupported file type!");
      return;
    }
    if (file==null)
      return;
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
   
    if(this.cards.length==0 || (!(this.existingCard())))
    {
      let card = 
      {
        front:this.front,
        back:this.back,
        frontimage:"",
        backimage:"",
        cardid:this.cardID
      }
      this.newCard=true;
      this.cards.push(card);
    }
    const path = `images/${this.cardID}${side}`;
    let ref = this.storage.ref(path);
    ref.put(file).then(async any=>
    { 
        ref.getDownloadURL().subscribe(result=>{
           if(side==1)
           {
            this.afs.collection('cards').doc(this.cardID).update({frontimage:result})
            .then(()=>
            {
              this.cards[this.cardIndex].frontimage=result;
              this.imageFront=result;
              this.loading.dismiss();
            });
          }
          else
          {
            this.afs.collection('cards').doc(this.cardID).update({backimage:result})
            .then(()=>
            {
              this.cards[this.cardIndex].backimage=result;
              this.imageBack=result;
              this.loading.dismiss();
            });
          }
        });
      });
  }

  presentErrorMessage(errorMessage:string)
  {
    // Displayed for a pending sent request. 
    let pendingMessage = this.alertCtrl.create({
      title: 'Error!',
      message: errorMessage,
      buttons: [
        {
          text: 'Ok!'
        }
      ]
    });
    pendingMessage.present()
  }
}
