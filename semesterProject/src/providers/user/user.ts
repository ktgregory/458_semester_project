import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private afs: AngularFirestore, private auth: AuthProvider) {
    
  }

  async createNewUser(uid:string, email:string, firstname: string, lastname: string, school: string)
  {

    await this.afs.doc(`users/${uid}`).set({
      uid: uid,
      firstname: firstname,
      lastname: lastname,
      email: email,
      school: school,
      type:"reg"
      })
  }

  // async getCurrentUserData()
  // {
  //   let data;
  //   let uid = await this.auth.getUserID();
  //   let ref = await this.afs.firestore.collection(`users`).where("uid","==",uid); 
  //   await ref.get().then((querySnapshot) => { 
  //     querySnapshot.forEach((doc) => {
  //       data = doc.data();
  //     })
  //   });
  //   return data; 
  // }
  // ^ (katie) i wrote this because i got confused on what part of the project i was supposed to do :)


}
