import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationModalPageRoutingModule } from './invitation-modal-routing.module';

import { InvitationModalPage } from './invitation-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationModalPageRoutingModule
  ],
  declarations: [InvitationModalPage]
})
export class InvitationModalPageModule {}
