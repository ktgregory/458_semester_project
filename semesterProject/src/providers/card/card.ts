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


}
