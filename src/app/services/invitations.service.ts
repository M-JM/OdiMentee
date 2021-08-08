/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
import { Invitation } from './invitation.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from './storage.service';
import { leftJoin, leftJoinDocument } from '../pipes/FirebaseJoin';
import { shareReplay } from 'rxjs/operators';


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

getAllInvitations(id: string){
  return this.db.collection(`invitations`, ref =>ref.where('mentor','==',id).where('status','==','pending'))
  .valueChanges({idField: 'id'})
  .pipe(
    leftJoinDocument(this.db,'mentee','profiles'),
    shareReplay(1)
  );
}

update(id: string, invitation: Invitation){
    return this.db.collection('invitations').doc(id).update(invitation);
  }

updateReply(id: string, weigeringstekst: string, status: string ){
  return this.db.collection('invitations').doc(id).update({
    'status': status,
    'weigertekst': weigeringstekst
  });
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




