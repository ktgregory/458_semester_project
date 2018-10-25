import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class CardProvider {

 
  constructor(private auth: AuthProvider, private afs: AngularFirestore) {
    
  }

  async getCurrentUserStacks()
  {
      let stacks = [];
      let uid = await this.auth.getUserID();
      let ref = await this.afs.firestore.collection(`stacks`).where("uid","==",uid); 
      await ref.get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
          stacks.push(doc.data());
        })
      });
      return stacks; 
  }

  async getCardsByStackID(stackID:string)
  {
    let cards = [];
    let ref = await this.afs.firestore.collection(`cards`).where("stackid","==",stackID); 
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        cards.push(doc.data());
      })
    });
    // if (cards.length==0)
    // {
    //   Promise.reject();
    // }
    return cards; 

  }

  async createNewStack() // uses set 
  {

  }

  async deleteStackWithID(stackID:String)
  {
    return this.afs.firestore.collection('stacks').where("stackID","==",stackID);
  }

  // async changeUserInfo()
  // {
  //   let userID = await this.authData.getUserID();
  //   this.afs.doc(`users/${userID}`).update({
  //     firstname:this.userForm.value.firstname,
  //     lastname:this.userForm.value.lastname,
  //     school:this.userForm.value.school
  //   }).then(
  //     any=>
  //     {
        
  //         let alert = this.alertCtrl.create({
  //           message: "Your information has been updated.",
  //           buttons: [
  //             {
  //               text: "Ok",
  //               role: 'cancel'
  //             }
  //           ]
  //         });
  //       alert.present();

        
  //     }
  //   );

  async editCard() //uses "update"
  { 

  }

  async deleteCard(cardID:String)
  {
    return this.afs.firestore.collection('cards').where("cardID","==",cardID);

  }

  async createCard() // uses "set"
  {

  }

}
