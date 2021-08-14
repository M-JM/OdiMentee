import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-photo-option',
  templateUrl: './profile-photo-option.page.html',
  styleUrls: ['./profile-photo-option.page.scss'],
})
export class ProfilePhotoOptionPage implements OnInit {

  constructor(private modalController: ModalController, private angularFireStorage: AngularFireStorage) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss(null, 'backdrop');
  }
  startCapture(type) {
    this.modalController.dismiss(type, 'select');
  }
  uploadProfileToFirebase(event) {
    const file = event.target.files;
    console.log(file);
    // eslint-disable-next-line no-var
    var fileName = file[0];
    console.log(fileName);

    if (fileName.type.split('/')[0] !== 'image') {
      console.log('file is not an image');
      return;
    }

    const path = `profilePictures/${new Date().getTime()}_${fileName.name}`;
this.modalController.dismiss(path,'gallery');
  }
}
