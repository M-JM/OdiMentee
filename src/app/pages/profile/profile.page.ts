/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-var */
import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';




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

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
this.profileService.getid().then(
  res => {
     this.profileService.getProfile(res).subscribe(data => {
       this.beschrijving = data['beschrijving'];
       this.opleiding = data['opleiding'];
       this.taalvoorkeur = data['taalvoorkeur'];
       this.userImage = data['photo'];
    });
  });

}
}
