import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ViewPage } from '../pages/view/view';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CardsPage } from '../pages/cards/cards';
import { EditPage } from '../pages/edit/edit';
import { UserPage } from '../pages/user/user';
import { NewcardsPage } from '../pages/newcards/newcards';
import { SelectPage } from '../pages/select/select';
import { CreatePage } from '../pages/create/create';
import { AboutPage } from '../pages/about/about';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    ViewPage,
    HomePage,
    TabsPage,
    CardsPage,
    UserPage,
    CreatePage,
    SelectPage,
    AboutPage,
    NewcardsPage,
    EditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ViewPage,
    SettingsPage,
    HomePage,
    TabsPage,
    CardsPage,
    UserPage,   
    CreatePage,
    SelectPage,
    AboutPage,
    NewcardsPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
