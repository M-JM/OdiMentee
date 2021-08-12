import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSizePipe } from './pipes/file-size.pipe';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [AppComponent, FileSizePipe],
  entryComponents: [],
  imports: [BrowserModule,
  IonicModule.forRoot(),
  IonicStorageModule.forRoot(),
  AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFirestoreModule,
  ReactiveFormsModule,
  Ng2SearchPipeModule

],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
