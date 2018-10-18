import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardsPage } from '../cards/cards';

@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {

  
  constructor(public navCtrl: NavController, private cardProv: ) {

  }

  async ngOnInt()
  {

  }

  goToCardsPage()
  {
    this.navCtrl.push(CardsPage);
  }



}
