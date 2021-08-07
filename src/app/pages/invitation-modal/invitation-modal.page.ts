import { Invitation } from './../../services/invitation.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { InvitationsService } from 'src/app/services/invitations.service';

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.page.html',
  styleUrls: ['./invitation-modal.page.scss'],
})
export class InvitationModalPage implements OnInit {

  userId;
  menteeId: string;
  invitationForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private invitationService: InvitationsService) { }

  ngOnInit() {
    this.invitationForm = this.fb.group({
      verzoektekst: ['', Validators.required]
    });
    this.invitationService.getid().then(
      res => {
        this.menteeId = res;
      }
    );
  }

close(){
  this.modalCtrl.dismiss();
}
sendInvitation(){
const invitation: Invitation = {
  mentee: this.menteeId,
  mentor: this.userId,
  verzoektekst: this.invitationForm.get('verzoektekst').value,
  weigertekst: '',
  status:'pending'
};


if(!this.invitationForm.valid){
  return false;
}else{
this.invitationService.create(invitation).then(() => {
  this.modalCtrl.dismiss();
});
}
}
}
