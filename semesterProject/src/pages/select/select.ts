import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { CardProvider } from '../../providers/card/card';


@IonicPage()
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {

  stacks = [];
  noStacks:Boolean;
  constructor(public navCtrl: NavController, private cardProv: CardProvider, public navParams: NavParams) {

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
    
    this.stacks.sort(this.cardProv.compareStrings);
  }

  ionViewWillEnter()
  {

  }

  goToCreatePage(stackid:string, stackname:string){
    this.navCtrl.push(CreatePage, {stackid:stackid, name:stackname});
  }

}
