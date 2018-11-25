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
  noStacks=false;
  constructor(public navCtrl: NavController, private cardProv: CardProvider) {

  }

  async ngOnInit()
  {
    await this.cardProv.getCurrentUserStacks(this.stacks).catch(()=>
      {
        this.noStacks=true;
      });
      if(await this.stacks.length==0)
      {
        this.noStacks = false;
      }
      else
        this.noStacks=true;
  }

  goToCardsPage(stackid:string)
  {
      this.navCtrl.push(CardsPage, {'stackid': stackid});
  }



}
