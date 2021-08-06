import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitationModalPage } from './invitation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationModalPageRoutingModule {}
