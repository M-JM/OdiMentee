import { StorageService } from './storage.service';
import { Profile } from './profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: AngularFirestore,private router: Router,private storage: StorageService) { }

create(profile: Profile){
  return this.db.collection('profiles').doc(profile.userId).set(profile);
}

getProfile(userId: string){
  return this.db.doc(`profiles/${userId}`).valueChanges();
}

update(id: string, profile: Profile){
  return this.db.collection('profiles').doc(id).update(profile);
}

async getid() {
  // eslint-disable-next-line no-var
  var value = await this.storage.get('id');
  return value;
}

}
