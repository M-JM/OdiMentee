import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.page.html',
  styleUrls: ['./invitation-modal.page.scss'],
})
export class InvitationModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

close(){
  this.modalCtrl.dismiss();
}

}
