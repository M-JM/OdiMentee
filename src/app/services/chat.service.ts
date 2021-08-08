import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonDatetime } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore, private authService: AuthService ) { }



getChats(){

}

getchat(chatid){

}

createChat(mentee,mentor){

  const data = {
    mentee,
    mentor,
    status: 'active',
  };
this.db.collection('chats').add(data);
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
