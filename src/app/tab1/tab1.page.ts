import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
userInfo = null;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    GoogleAuth.init();
  }

  logout(){
    this.auth.signOut();
    console.log('testing');
  }

async googleSignup() {
  console.log('test');
  const googleUser = await GoogleAuth.signIn();
  console.log('user', googleUser);
  this.userInfo = googleUser;
}


}
