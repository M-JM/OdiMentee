/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-var */
import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InvitationModalPage } from '../invitation-modal/invitation-modal.page';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any;
  userid: any;
  beschrijving: any;
  opleiding: any;
  taalvoorkeur: any;
  userImage: any;
  campus: any;
  opleidingsgraad: any;
  naam: any;
  skills: any;

  constructor(private profileService: ProfileService, private modalCtrl: ModalController, private auth: AuthService) { }

  ngOnInit() {
this.profileService.getid().then(
  res => {
     this.profileService.getProfile(res).subscribe(data => {
       this.beschrijving = data['beschrijving'];
       this.opleiding = data['opleiding'];
       this.taalvoorkeur = data['taalvoorkeur'];
       this.userImage = data['photo'];
       this.campus = data['campus'];
       this.naam = data['naam'];
       this.opleidingsgraad=data['opleidingsfase'];
       this.skills=data['skills'];
    });
  });

}
logout(){
  this.auth.signOut();
}


}
