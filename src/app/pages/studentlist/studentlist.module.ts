import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentlistPageRoutingModule } from './studentlist-routing.module';

import { StudentlistPage } from './studentlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentlistPageRoutingModule
  ],
  declarations: [StudentlistPage]
})
export class StudentlistPageModule {}
