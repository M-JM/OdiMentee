import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitationReplyModalPage } from './invitation-reply-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationReplyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationReplyModalPageRoutingModule {}
