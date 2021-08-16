import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InvitationsService } from 'src/app/services/invitations.service';
import { ProfileService } from 'src/app/services/profile.service';
import { InvitationReplyModalPage } from '../invitation-reply-modal/invitation-reply-modal.page';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  invitations: any[] ;
  mentorships: any[] ;
  showSpinner = true;

  constructor(
    private profileService: ProfileService,
    private invitationService: InvitationsService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  this.getData();
  }

  async openInvitation(id: string, mentor: string,mentee: string){
  const modal = await this.modalCtrl.create({
  component:InvitationReplyModalPage,
  componentProps: {
  invitationId: id,
  mentee,
  mentor
  },
  cssClass: 'invitation-reply-modal'
    });
    await modal.present();
  }

  getData(){
    this.profileService.getid().then(res => {
      this.invitationService.getAllInvitations(res).subscribe( result => {
        this.invitations = result as Array<any>;
        console.log('myresult',result);
        console.log(this.invitations);
      });
      this.invitationService.getAllMentorships(res).subscribe( result => {
        this.mentorships = result as Array<any>;
        console.log('myresult2',result);
      });
    }).finally( () => {
      this.showSpinner = false;
    }
    );
  }

}
