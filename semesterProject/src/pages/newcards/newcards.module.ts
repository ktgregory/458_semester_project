import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewcardsPage } from './newcards';

@NgModule({
  declarations: [
    NewcardsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewcardsPage),
  ],
})
export class NewcardsPageModule {}
