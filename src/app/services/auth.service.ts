/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  currentUser = new BehaviorSubject(null);
  constructor(private afAuth: AngularFireAuth,private db: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.uid}`).valueChanges().pipe(
            take(1),
            tap(data => {
              data['id'] = user.uid;
              this.currentUser.next(data);
            })
          );
        } else {
          this.currentUser.next(null);
          return of(null);
        }
      })
    );
   }

  signUp(credentials) {
    console.log('tried to create user');
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(data => this.db.doc(`users/${data.user.uid}`).set({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: data.user.email,
        role: 'USER',
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


}
