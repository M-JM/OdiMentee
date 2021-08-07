import { Invitation } from './invitation.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

  constructor(private db: AngularFirestore,private storage: StorageService) { }


  create(invitation: Invitation){
    return this.db.collection('invitations').doc().set(invitation);
  }

  getInvitation(id: string){
 return this.db.doc(`invitations/${id}`).valueChanges();
  }

  update(id: string, invitation: Invitation){
    return this.db.collection('invitations').doc(id).update(invitation);
  }

  async getid() {
    // eslint-disable-next-line no-var
    var value = await this.storage.get('id');
    return value;
  }

  checkInvitation(mentee,mentor){
    return this.db.collection(`invitations`, ref => ref
    .where('mentee','==',mentee)
    .where('mentor','==',mentor)).snapshotChanges();
      }
  }




