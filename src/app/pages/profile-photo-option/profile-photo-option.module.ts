import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePhotoOptionPageRoutingModule } from './profile-photo-option-routing.module';

import { ProfilePhotoOptionPage } from './profile-photo-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePhotoOptionPageRoutingModule
  ],
  declarations: [ProfilePhotoOptionPage]
})
export class ProfilePhotoOptionPageModule  {}
