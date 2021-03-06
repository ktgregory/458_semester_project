import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';


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
      front: [this.front],
      frontImg: [this.imageFront],
      back: [this.back],
      backImg: [this.imageBack]
    });
  }

  async save(){
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();
   
    if(this.newCard) 
      this.totalCards++;

      await this.cardProv.editCard(this.cardForm.value.back, this.imageBack, this.cardID, 
        this.cardForm.value.front, this.imageFront).then(async()=>
      {
        this.newCard = false;
        this.loading.dismiss();
      });
      
      this.front=this.cardForm.value.front;
      this.back=this.cardForm.value.back;
      this.cardForm = this.FormBuilder.group({
        front: [this.front],
        frontImg: [this.imageFront],
        back: [this.back],
        backImg: [this.imageBack]
      });
    
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
        text: 'No, stay!'
      }
    ]
  });
  confirm.present();
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
    confirm.present();
  }


  async ngOnInit()
  {
      await this.getCards();
      this.addCard();
      this.newCard=true;
  
  
  }

  ionViewWillLeave()
  {
    if(this.newCard)
      this.deleteCard();
  }
  
  async ionViewWillEnter()
  {
    if(this.cards[0]!=null && this.cards[0].new==false)
    {
      this.newCard=false;
      this.front =  this.cards[0].front;
      this.back =  this.cards[0].back;
      this.imageFront = this.cards[0].frontimage;
      this.imageBack = this.cards[0].backimage;
      this.cardID =  this.cards[0].cardid;
      this.deleteInitialTempCard();
    }
  }

  incrementCard()
  {
    this.cardIndex+=1;
    this.cardNumber+=1;
    this.imageFront='';
    this.imageBack='';
    if(this.cardIndex<this.cards.length)
    {
      this.front = this.cards[this.cardIndex].front;
      this.back = this.cards[this.cardIndex].back;
      this.imageFront = this.cards[this.cardIndex].frontimage;
      this.imageBack = this.cards[this.cardIndex].backimage;
      this.cardID = this.cards[this.cardIndex].cardid;
      this.newCard=false;
      this.cardForm = this.FormBuilder.group({
        front: [this.front],
        frontImg: [''],
        back: [this.back],
        backImg: ['']
      });
    }
    else
    {
      this.addCard();
    }
  }

  async addCard(){
    this.newCard=true;
    this.front = '';
    this.back = '';
    this.imageFront = '';
    this.imageBack = '';
    this.cardID = await this.afs.createId();
    this.cardProv.createCard(this.cardID, this.stackid, "", "", "", "");
  }

  decrementCard()
  {
    if(this.newCard) 
      this.deleteCard();
    this.imageFront='';
    this.imageBack='';
    this.newCard=false;
    this.cardIndex-=1;
    this.cardNumber-=1;
    this.front = this.cards[this.cardIndex].front;
    this.back = this.cards[this.cardIndex].back;
    this.imageFront = this.cards[this.cardIndex].frontimage;
    this.imageBack = this.cards[this.cardIndex].backimage;
    this.cardID = this.cards[this.cardIndex].cardid;
    this.cardForm = this.FormBuilder.group({
      front: [this.front],
      frontImg: [''],
      back: [this.back],
      backImg: ['']
    });
  }

  refresh(){
    this.navCtrl.pop();
    this.navCtrl.push(CreatePage,
      {stackid: this.stackid,
        name: this.stackname});
  }

  deleteCard()
  {
    this.cardProv.deleteCard(this.cardID, this.imageFront, this.imageBack);
  }


  async uploadImage(event:FileList, side:Number)
  {
    let file = event.item(0);

    if (file==null)
      return;
    if (file.type.split('/')[0] !== 'image') { 
      this.presentErrorMessage("You have selected an unsupported file type!");
      return;
    }
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();
  
    const path = `images/${this.cardID}${side}`;
    let ref = this.storage.ref(path);
    ref.put(file).then(async ()=>
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
    pendingMessage.present();
  }


  async getCards()
  {
    let card;
    let ref = await this.afs.firestore.collection(`cards`).where("stackid","==",this.stackid); 
    await ref.onSnapshot((querySnapshot) => { 
      querySnapshot.docChanges().forEach(async (change) => {
       card = await change.doc.data();
       if(change.type==="added")
       {
        this.cards.push(await card);
        if(card.new==false)
        {
          this.totalCards++;
          if(this.totalCards==1)
          {
            this.deleteInitialTempCard();
          }
        }
       }
       if(change.type=="removed")
       {

         this.removeCard(await card);

       }
       if(change.type==="modified")
       {
         this.updateCardInfo(await card);
       }
      })
    });
  }

  removeCard(cardToRemove)
  {
   for(let i=0; i < this.cards.length; i++)
   {
     if(this.cards[i].cardid == cardToRemove.cardid)
     {
       if(this.cards[i].new==false) 
       {
        this.totalCards--;
        if(i!=0)
        {
          this.decrementCard();
          this.cardIndex=i-1;
          this.cardNumber=i;
        } 
        else 
        {
          this.incrementCard();
          this.cardIndex=i;
          this.cardNumber=i+1;
        }
       }
       this.cards.splice(i,1);
     }
   }
  }

  async deleteInitialTempCard()
  {
    this.cards.forEach(card=>
      {
        if (card.new==true)
        {
          this.cardProv.deleteCard(card.cardid, "", "").then(()=>
          {
            this.newCard = false;
            this.front =  this.cards[0].front;
            this.back =  this.cards[0].back;
            this.imageFront = this.cards[0].frontimage;
            this.imageBack = this.cards[0].backimage;
            this.cardID =  this.cards[0].cardid;
            this.totalCards = this.cards.length;
          });
          return;
        }
      })
  }

  updateCardInfo(cardToUpdate)
  {
   for(let i=0; i < this.cards.length; i++)
   {
     if(this.cards[i].cardid == cardToUpdate.cardid)
     {
       this.cards[i]=cardToUpdate;
     }
   }
  }
}
