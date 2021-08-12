import { LoadingSpinnerComponent } from './../../ui/loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentlistPageRoutingModule } from './studentlist-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { StudentlistPage } from './studentlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    StudentlistPageRoutingModule,
  ],
  declarations: [StudentlistPage,LoadingSpinnerComponent]
})
export class StudentlistPageModule {}
