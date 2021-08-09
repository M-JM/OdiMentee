import { combineLatest } from 'rxjs';
/* eslint-disable @typescript-eslint/ban-types */
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { leftJoinDocument } from '../pipes/FirebaseJoin';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore, private authService: AuthService ) { }



getChats(id: string, role: string){
  let opp: string;
  if(role === 'mentee'){
    opp = 'mentor';
  }else{
    opp= 'mentee';
  }
  const x = this.db.collection(`chats`, ref =>ref.where(role,'==',id))
  .valueChanges({idField: 'id'}).pipe(
    leftJoinDocument(this.db,opp,'profiles'),
    shareReplay(1),
  ).pipe(
    switchMap((chats: any[]) => {
      const res = chats.map((r: any) =>this.db
        .collection(`chats/${r.id}/messages`, ref => ref.orderBy('createdAt','desc').limit(1)).valueChanges().
        pipe(
          map(messages => Object.assign(chats,{messages}))
          ));
      return combineLatest(...res);
    })
  );
return x;
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
createdAt: Date.now()
};
this.db.doc(`chats/${chatid}`).collection('messages').add(newMessage);
}



}
