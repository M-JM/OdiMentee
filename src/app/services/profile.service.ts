/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
import { Skill } from './skill.model';
import { StorageService } from './storage.service';
import { Profile } from './profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: AngularFirestore,private storage: StorageService) { }

create(profile: Profile){
  return this.db.collection('profiles').doc(profile.userId).set(profile);
}

getProfile(userId: string){
  return this.db.doc(`profiles/${userId}`).valueChanges();
}

// the below function is unnecessary and just serves to help me with being able to navigate prop.
// should change the above one and see if nothing else breaks.

getProfileAsObservable(userId: string){
  return this.db.doc(`profiles/${userId}`).valueChanges().pipe(take(1)) as Observable<Profile>;
}


getProfiles(){
  return this.db.collection(`profiles`, ref =>ref.where('role','==','mentor')).valueChanges();
  //.pipe(take(1)) as Observable<Profile[]>
}

update(id: string, profile: Profile){
  return this.db.collection('profiles').doc(id).update(profile);
}

async getid() {
  // eslint-disable-next-line no-var
  var value = await this.storage.get('id');
  return value;
}


getSkills(): Observable<Skill[]> {
  return this.db.collection('skills').get().pipe(map(snapshot => {
    let skills = [];

    snapshot.forEach(doc => {
      skills.push(new Skill({
        id: doc.id,
        naam: doc.data()['Naam']
      }));
    });

    return skills;
  }));
}

}
