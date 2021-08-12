import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatlistPageRoutingModule } from './chatlist-routing.module';

import { ChatlistPage } from './chatlist.page';
import { LoadingSpinnerComponent } from 'src/app/ui/loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatlistPageRoutingModule
  ],
  declarations: [ChatlistPage,LoadingSpinnerComponent]
})
export class ChatlistPageModule {}
