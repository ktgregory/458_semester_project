import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { UserProvider } from '../../providers/user/user';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public userForm: FormGroup;
  public loading: Loading;
  info = "";

  constructor(public nav: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, private userProv: UserProvider,
    public afs: AngularFirestore) {

    this.userForm = formBuilder.group({
      firstname:[''],
      lastname:[''],
      school:['']
    });
  }

  async ngOnInit()
  {
    this.info = await this.userProv.getCurrentUserData();
  }


  async changeUserInfo()
  {
    let userID = await this.authData.getUserID();
    this.afs.doc(`users/${userID}`).update({
      firstname:this.userForm.value.firstname,
      lastname:this.userForm.value.lastname,
      school:this.userForm.value.school
    }).then(
      any=>
      {
        
          let alert = this.alertCtrl.create({
            message: "Your information has been updated.",
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
        alert.present();

        
      }
    );
    
  }


}
