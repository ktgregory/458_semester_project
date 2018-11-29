import { Component } from '@angular/core';
import { NavController, AlertController, NavParams} from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {

  stackid: string;
  cardIndex = 0;
  cardNumber = 1;
  totalCards = 0;
  cards = [];
  front = "";
  back = "";
  imageFront="";
  imageBack="";
  frontSide=true; //when this is true, show front.
  stackNotEmpty=false;
  hasLoaded=false;
  timeout=500;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, 
    private cardProv: CardProvider, public navParams: NavParams, private afs: AngularFirestore) {
      this.stackid = navParams.get("stackid");
  }

  async ngOnInit()
  {
    await this.getCards();
    this.totalCards = await this.cards.length;
      if(await this.cards.length==0)
      {
        this.stackNotEmpty = false;
      }
      else
      {
        
      }
  }

 toggleFrontBack()
  {
    if(this.frontSide==true)
    {
      this.frontSide = false;
    }
    else
    {
      this.frontSide = true;
    }
  }

  ionViewDidLoad()
  {
    setTimeout(() => {
      this.hasLoaded=true;
    }, this.timeout);
  }

  incrementCard()
  {
    this.cardIndex+=1;
    this.cardNumber+=1;
    this.frontSide=true;
    this.front = this.cards[this.cardIndex].front;
    this.back = this.cards[this.cardIndex].back;
    this.imageFront = this.cards[this.cardIndex].frontimage;
    this.imageBack = this.cards[this.cardIndex].backimage;
  }

  decrementCard()
  {
    this.cardIndex-=1;
    this.cardNumber-=1;
    this.frontSide=true;
    this.front = this.cards[this.cardIndex].front;
    this.back = this.cards[this.cardIndex].back;
    this.imageFront = this.cards[this.cardIndex].frontimage;
    this.imageBack = this.cards[this.cardIndex].backimage;

  }
  

  async getCards()
  {
    let ref = await this.afs.firestore.collection(`cards`).where("stackid","==",this.stackid); 
    await ref.onSnapshot((querySnapshot) => { 
      querySnapshot.docChanges().forEach(async (change) => {
       let newCard = await change.doc.data();
       if(change.type==="added")
       {
        this.cards.push(await newCard);
        if (this.cards.length==1)
        {
          this.stackNotEmpty = true;
          this.front = await this.cards[this.cardIndex].front;
          this.back = await this.cards[this.cardIndex].back;
          this.imageFront = this.cards[this.cardIndex].frontimage;
          this.imageBack = this.cards[this.cardIndex].backimage;
        }
       }
       if(change.type==="removed")
       {
        this.cards = this.cardProv.removeCard(this.cards, await newCard);
       }
       if(change.type==="modified")
       {
         this.cards.forEach(card=>
          {
            if(card.cardid==newCard.cardid)
            {
              card = newCard;
            }
          })
       }
      })
    });

  }


}
