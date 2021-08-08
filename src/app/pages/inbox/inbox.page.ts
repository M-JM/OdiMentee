import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InvitationsService } from 'src/app/services/invitations.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  invitations: any[];

  constructor(
    private profileService: ProfileService,
    private invitationService: InvitationsService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.profileService.getid().then(res => {
      this.invitationService.getAllInvitations(res).subscribe( result => {
        this.invitations = result as Array<any>;
        console.log('myresult',result);
        console.log(this.invitations);
      });
    });
  }

}
