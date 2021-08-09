import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InvitationsService } from 'src/app/services/invitations.service';

@Component({
  selector: 'app-invitation-reply-modal',
  templateUrl: './invitation-reply-modal.page.html',
  styleUrls: ['./invitation-reply-modal.page.scss'],
})
export class InvitationReplyModalPage implements OnInit {

  isRejected: any;
  isActive: any;
  invitationId: any;
  mentor: any;
  mentee: any;
  replyForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private invitationService: InvitationsService,
    private chatService: ChatService) { }

ngOnInit() {
  this.isRejected = false;
  this.isActive = true;
    this.replyForm = this.fb.group({
      weigeringstekst:['']
    });
}

rejection(){
  this.isRejected = true;
  this.isActive = false;

}

reject(){
  console.log(this.invitationId);
  console.log(this.replyForm.get('weigeringstekst').value);
    this.invitationService.updateReply(this.invitationId,this.replyForm
      .get('weigeringstekst').value,'rejected')
     .then(() => {
       this.close();
     }).catch(
       (error) => {
       console.log(error);
     });
  }

accept(){
 this.invitationService.updateReply(this.invitationId,this.replyForm
  .get('weigeringstekst').value,'accepted')
 .then(() => {
   this.chatService.createChat(this.mentee, this.mentor).then(docRef => {
     this.chatService.sendMessage(docRef.id,'hello',this.mentee);
     console.log(docRef.id);
   })
  .catch( error => {console.log(error);});
   this.close();
 }).catch(
   (error) => {
   console.log(error);
 });
}


close(){
 this.modalCtrl.dismiss();
}
}
