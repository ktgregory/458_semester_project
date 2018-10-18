import { Component, OnInit } from '@angular/core';
import { NavController} from 'ionic-angular';
import { CardsPage } from '../cards/cards';
import { CardProvider } from '../../providers/card/card';

@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage implements OnInit {

  stacks = [];
  stackid: string = '';
  noStacks:Boolean;
  constructor(public navCtrl: NavController, private cardProv: CardProvider) {

  }

  async ngOnInit()
  {
    this.stacks = await this.cardProv.getCurrentUserStacks();
    if (this.stacks.length==0)
    {
      this.noStacks = true;
    }

  }

  goToCardsPage(stackid:string)
  {
      this.navCtrl.push(CardsPage, {'stackid': stackid});
  }



}
