import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { CardProvider } from '../../providers/card/card';


/**
 * Generated class for the SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    this.stacks = await this.cardProv.getCurrentUserStacks();
    if (this.stacks.length==0)
    {
      this.noStacks = true;
    }

  }

  ionViewWillEnter(){
    this.ngOnInit();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPage');
  }

  goToCreatePage(stackid:string, stackname:string){
    this.navCtrl.push(CreatePage, {stackid:stackid, name:stackname});
  }

}
