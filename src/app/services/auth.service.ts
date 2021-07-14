import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/firestore';

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

}
