import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { ViewPage } from '../pages/view/view';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CardsPage } from '../pages/cards/cards';
import { SignupPage } from '../pages/signup/signup';
import { UserPage } from '../pages/user/user';
import { NewcardsPage } from '../pages/newcards/newcards';
import { SelectPage } from '../pages/select/select';
import { CreatePage } from '../pages/create/create';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environment/environment';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { CardProvider } from '../providers/card/card';


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
    LoginPage,
    AboutPage,
    NewcardsPage,
    ForgotpasswordPage,
    ChangepasswordPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'seniorProject'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
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
    LoginPage,
    AboutPage,
    NewcardsPage,
    ForgotpasswordPage,
    ChangepasswordPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    CardProvider
  ]
})
export class AppModule {}
