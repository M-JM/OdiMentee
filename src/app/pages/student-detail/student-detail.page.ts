import { InvitationsService } from 'src/app/services/invitations.service';
import { ModalController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InvitationModalPage } from '../invitation-modal/invitation-modal.page';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {
  profile: any;
  userid: any;
  beschrijving: any;
  opleiding: any;
  taalvoorkeur: any;
  userImage: any;
  campus: any;
  opleidingsgraad: any;
  naam: any;
  alreadySent: any;
  skills: any;
  private _entityId: any;

  constructor(private profileService: ProfileService,
   private invitationService: InvitationsService,
     private route: ActivatedRoute,
      private modalCtrl: ModalController) { }

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    this.route.paramMap.subscribe((params: ParamMap) => {
      this._entityId = params.get('id');
      this.profileService.getProfile(this._entityId).subscribe(data => {
        this.beschrijving = data['beschrijving'];
        this.opleiding = data['opleiding'];
        this.taalvoorkeur = data['taalvoorkeur'];
        this.userImage = data['photo'];
        this.campus = data['campus'];
        this.naam = data['naam'];
        this.opleidingsgraad=data['opleidingsfase'];
        this.skills=data['skills'];
     });
     this.profileService.getid().then(res => {
      this.checkInv(res,this._entityId);
      console.log(res);
     });
    });
  }
  async openInvitation(){
    console.log('triggered');
  const modal = await this.modalCtrl.create({
  component:InvitationModalPage,
  componentProps: {
    userId: this._entityId,
  },
  cssClass: 'invitation-modal'
    });
    await modal.present();
  }

checkInv(mentee, mentor){

  this.invitationService.checkInvitation(mentee,mentor).subscribe(res => {
    if(res.length > 0){
      this.alreadySent = true;
    }else{
      this.alreadySent = false;
    }
  });
}



}
