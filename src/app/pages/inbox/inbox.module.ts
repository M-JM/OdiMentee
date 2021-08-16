import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxPageRoutingModule } from './inbox-routing.module';

import { InboxPage } from './inbox.page';
import { LoadingSpinnerComponent } from 'src/app/ui/loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxPageRoutingModule
  ],
  declarations: [InboxPage,LoadingSpinnerComponent]
})
export class InboxPageModule {}
