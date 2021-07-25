import { Profile } from './profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: AngularFirestore,private router: Router) { }

create(profile: Profile){
  return this.db.collection('profiles').add(profile);
}

getProfile(userId: string){
  return this.db.collection('profiles', ref => ref.where('userId','==',userId));
}

update(id: string, profile: Profile){
  return this.db.collection('profiles').doc(id).update(profile);
}

}
