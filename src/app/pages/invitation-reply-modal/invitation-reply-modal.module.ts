import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationReplyModalPageRoutingModule } from './invitation-reply-modal-routing.module';

import { InvitationReplyModalPage } from './invitation-reply-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationReplyModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InvitationReplyModalPage]
})
export class InvitationReplyModalPageModule {}
