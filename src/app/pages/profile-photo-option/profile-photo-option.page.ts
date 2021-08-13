import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-photo-option',
  templateUrl: './profile-photo-option.page.html',
  styleUrls: ['./profile-photo-option.page.scss'],
})
export class ProfilePhotoOptionPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss(null, 'backdrop');
  }
  startCapture(type) {
    this.modalController.dismiss(type, 'select');
  }
}
