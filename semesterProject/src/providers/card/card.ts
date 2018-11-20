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

  async createNewStack(stackname:string, id:string) // uses set 
  {
    //let id = this.afs.createId();
    let userid = this.auth.getUserID();
    await this.afs.collection(`stacks`).doc(id).set({
     name: stackname,
     uid: userid,
     stackid: id
    });

  }

  async deleteStackWithID(stackID:string)
  {
    let cards = await this.getCardsByStackID(stackID);
    for (let card of cards){
      this.deleteCard(card.cardid);
    }
    await this.afs.collection(`stacks`).doc(stackID).delete();
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

  async editCard(backText:String, backImg:String, cardID:String, frontText:String, frontImg:String) //uses "update"
  { 
    if (backText != ''){
      await this.afs.doc(`cards/${cardID}`).update({
        back: backText
      });
    }

    if (backImg != ''){
      await this.afs.doc(`cards/${cardID}`).update({
        backimage: backImg
      });
    }

    if (frontText != ''){
      await this.afs.doc(`cards/${cardID}`).update({
        front: frontText
      });
    }

    if(frontImg != ''){
      await this.afs.doc(`cards/${cardID}`).update({
        frontimage: frontImg
      });
    }
  }

  async deleteCard(cardID:String)
  {
    return this.afs.doc(`cards/${cardID}`).delete();
  }

  async createCard(id: String, stackID:String, backText:String, backImg:String, frontText:String, frontImg:String) // uses "set"
  {
    await this.afs.doc(`cards/${id}`).set({
      back: backText,
      backimage: backImg,
      front: frontText,
      frontimage: frontImg,
      stackid: stackID,
      cardid: id
    });
  }

}
