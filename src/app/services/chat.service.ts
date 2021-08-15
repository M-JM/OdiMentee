/* eslint-disable arrow-body-style */
import { combineLatest } from 'rxjs';
/* eslint-disable @typescript-eslint/ban-types */
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { leftJoinDocument } from '../pipes/FirebaseJoin';
import { firebase } from '@firebase/app';
import '@firebase/firestore';




@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore, private authService: AuthService ) { }



getChats(id: string, role: string){
  console.log(id);
  console.log(role);
  let opp: string;
  if(role === 'mentee'){
    opp = 'mentor';
  }else{
    opp= 'mentee';
  }
  //https://fireship.io/lessons/firestore-advanced-usage-angularfire/
  //http://www.lukasjakob.com/how-to-get-firestore-collection-data-with-sub-collections-in-angular/

  const finalResult = this.db.collection(`chats`, ref =>ref.where(role,'==',id))
  .valueChanges({idField: 'id'}).pipe(
    leftJoinDocument(this.db,opp,'profiles'),
    shareReplay(1),
  ).pipe(
    switchMap((chats: any[]) => {
      const res = chats.map((r: any) => { return this.db
        .collection(`chats/${r.id}/messages`, ref => ref.orderBy('createdAt','desc').limit(1)).valueChanges().
        pipe(
          map(messages => Object.assign(r,{messages}))
          );});
      return combineLatest(...res);
    })
  );
  console.log(finalResult);
return finalResult;
}


getChatMessages(groupId) {
  return this.db.collection(`chats/${groupId}/messages`, ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data as {} };
    }))
  );
}

getchat(chatid){

}

createChat(mentee,mentor){

  const data = {
    mentee,
    mentor,
    status: 'active',
  };
return this.db.collection('chats').add(data);
}

sendMessage(chatid,message, userid){
const newMessage = {
author: userid,
message,
createdAt: firebase.firestore.FieldValue.serverTimestamp()
};
return this.db.doc(`chats/${chatid}`).collection('messages').add(newMessage);
}



}
