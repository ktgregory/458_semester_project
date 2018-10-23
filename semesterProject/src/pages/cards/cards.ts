import { Component } from '@angular/core';
import { NavController, AlertController, NavParams} from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';
import { AsyncPipe } from '@angular/common';
import { timeoutWith } from 'rxjs/operators';

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
  stackNotEmpty:Boolean;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, 
    private cardProv: CardProvider, public navParams: NavParams) {
      this.stackid = navParams.get("stackid");
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
        this.totalCards = await this.cards.length;
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
  


}
