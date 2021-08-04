import { StorageService } from './storage.service';
/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { take, switchMap, tap, pluck, debounce } from 'rxjs/operators';
import { User } from './user.model';
import { Storage } from '@ionic/storage-angular';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  currentUser = new BehaviorSubject<User>(null);
  private x: User;
  constructor(private afAuth: AngularFireAuth,private db: AngularFirestore, private router: Router, private storage: StorageService) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            take(1),
            tap(data => {
              data['id'] = user.uid;
              this.currentUser.next(data);
            })
          );
        } else {
          console.log('i was null and thus it doesn work');
          this.currentUser.next(null);
          return of(null);
        }
      })
    );
    console.log('from Constr', this.user$);
   }

  signUp(credentials) {
    console.log('tried to create user');
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(data => this.db.doc(`users/${data.user.uid}`).set({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: data.user.email,
        role: 'USER',
        hasCompletedIntro: false,
        permissions: [],
        created: firebase.firestore.FieldValue.serverTimestamp()
      }));
  }


  signIn(credentials): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.user.uid}`).valueChanges().pipe(
            take(1)
          );
        } else {
          return of(null);
        }
      })
    );
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  resetPw(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  setUser(x: User){
    // eslint-disable-next-line no-var
    var y = this.getUid().then( res => { console.log(res);
      this.storage.set('id',res);});
    console.log(y);
    console.log(this.storage.get('id'));
  return this.x = x;
  }

  hasSeenIntro(): any {
  return this.x.hasCompletedIntro;
  }

  async getUid(): Promise<any> {
   return (await this.afAuth.currentUser).uid;
  }

  hasCompletedIntro(uid: any): any {
    this.db.collection('users').doc(uid).update({
      hasCompletedIntro: true
    });
    this.x.hasCompletedIntro = true;
  }

}
