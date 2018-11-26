import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';


@Injectable()
export class CardProvider {

 
  constructor(private auth: AuthProvider, private afs: AngularFirestore,
    private storage: AngularFireStorage) {
    
  }

  async getCurrentUserStacks(stacks)
  {
      let uid = await this.auth.getUserID();
      let ref = await this.afs.firestore.collection(`stacks`).where("uid","==",uid); 
      await ref.onSnapshot((querySnapshot) => { 
        querySnapshot.docChanges().forEach(async (change) => {
         let stack= await change.doc.data();
         if(change.type==="added")
         {
          stacks.push(await stack);
          stacks.sort(this.compareStrings);
         }
         if(change.type==="removed")
         {
          stacks = this.removeStack(stacks, stack);
         }
        })
      });

      return stacks; 
  }

 removeStack(stacks, stackToRemove)
 {
  for(let i=0; i < stacks.length; i++)
  {
    if(stacks[i].stackid == stackToRemove.stackid)
    {
      stacks.splice(i,1);
      stacks.sort(this.compareStrings);
    }
  }
  return stacks;
 }

 removeCard(cards, cardToRemove)
 {
  for(let i=0; i < cards.length; i++)
  {
    if(cards[i].cardid == cardToRemove.cardid)
    {
      cards.splice(i,1);
      cards.sort(this.compareStrings);
    }
  }
  return cards;
 }
  compareStrings(stack1,stack2)
  {
    if(stack2.name>stack1.name)
      return -1;
    else
      return 1;
  }

  async getCardsByStackID(cards, stackID:string)
  {
    let ref = await this.afs.firestore.collection(`cards`).where("stackid","==",stackID); 
    await ref.onSnapshot((querySnapshot) => { 
      querySnapshot.docChanges().forEach(async (change) => {
       let card = await change.doc.data();
       if(change.type==="added")
       {
        cards.push(card);
       }
       if(change.type==="removed")
       {
        cards = this.removeCard(cards, card);
       }
      })
    });
    return await cards; 

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
    let cards = [];
    await this.getCardsByStackID(cards, stackID);
    cards.forEach(async card=>
      {
        await this.deleteCard(card.cardid, card.frontimage, card.backimage);
      });
    await this.afs.collection(`stacks`).doc(stackID).delete();
  }


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

    await this.afs.doc(`cards/${cardID}`).update({
      new: false
    });
  }

  async deleteCard(cardID:String, frontimage, backimage)
  {
    if(frontimage!="") this.storage.ref("images/"+cardID+"1").delete();
    if(backimage!="" ) this.storage.ref("images/"+cardID+"2").delete();
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
      cardid: id,
      new:true
    });
  }

}
