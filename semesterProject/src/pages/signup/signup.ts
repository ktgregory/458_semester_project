import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/email';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public nav: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, private userService: UserProvider) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      firstname:[''],
      lastname:[''],
      school:['']
    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */

  async signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        let id = this.authData.getUserID();
        this.userService.createNewUser(id, this.signupForm.value.email, this.signupForm.value.firstname, this.signupForm.value.lastname, this.signupForm.value.school)
        this.nav.setRoot(TabsPage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}