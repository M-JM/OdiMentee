import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDetailPageRoutingModule } from './student-detail-routing.module';

import { StudentDetailPage } from './student-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDetailPageRoutingModule,
    RouterModule
  ],
  declarations: [StudentDetailPage]
})
export class StudentDetailPageModule {}
