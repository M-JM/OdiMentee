import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePhotoOptionPage } from './profile-photo-option.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePhotoOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePhotoOptionPageRoutingModule {}
