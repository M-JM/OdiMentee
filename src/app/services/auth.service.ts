import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { from, Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,private db: AngularFirestore, private router: Router) { }

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
