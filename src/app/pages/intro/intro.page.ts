/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from './../../services/profile.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonSlides, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Skill } from 'src/app/services/skill.model';
import { BehaviorSubject } from 'rxjs';

import { ProfilePhotoOptionPage } from '../profile-photo-option/profile-photo-option.page';
import { Camera, CameraResultType,CameraSource, Photo } from '@capacitor/camera';
import { Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  image: Photo;
  talen: Array<string>;
  opleidingen: Array<string>;
  opleidingenGraad: Array<string>;
  campusen: Array<string>;
  tests: any;
  rol: any;
  name: string;
  userId: any;
  fileName: string;
  uploadFileName = 'https://firebasestorage.googleapis.com/v0/b/odibuddy-bb12a.appspot.com/o/profilePictures%2Fdownload.jpg?alt=media&token=72147f8d-5d45-4e20-8dc3-4ae36c3b66c5';
  photo: any = './assets/imgs/profile.jpg';
  toggle = true;
  profile: Profile;
  selectedUsers = [];
  obsSkills = new BehaviorSubject<Skill[]>([]);

  introForm: FormGroup;
  imageUpload: AngularFireUploadTask;
  campus: string[];

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private angularFireStorage: AngularFireStorage,
    private modalController: ModalController,
    private router: Router,
    private loadingControl: LoadingController
  ) { }

  ngOnInit() {
    console.log(this.photo);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
      this.profileService.getSkills().subscribe((res) => {
        this.tests = res;
        this.authService.currentUser.subscribe(result => {
          this.name = result.firstName +' ' + result.lastName;
        });
      });
    });

    this.talen = ['Nederlands', 'Engels'];

    this.opleidingen = ['ICT', 'ICT-Graduaat', 'ICT-Elektronica'];

    this.campusen = ['Brussel', 'Mechelen', 'Schaarbeek'];

    this.opleidingenGraad = ['1ste', '2de', '3de', '4de'];

    this.introForm = new FormGroup({
      talen: new FormControl('', Validators.required),
      opleidingen: new FormControl('', Validators.required),
      opleidingenGraad: new FormControl('',Validators.required),
      tests: new FormControl(this.tests),
      campusen: new FormControl('',Validators.required),
      beschrijving: new FormControl('')
    });
  }

  slideOpts = {
    initialSlide: 3,
    speed: 600,
    allowTouchMove:false
  };

  next() {
    this.slides.slideNext();
  }

  nextFinal(){
    this.slides.slideNext();
    setTimeout(() => {
    this.router.navigate(['/tabs']);
    }, 2000);
  }

  selectRol(rol: string){
    this.rol = rol;
    this.next();
  };


  onSubmit() {
    this.profile = {
      opleidingsfase: this.introForm.get('opleidingenGraad').value,
      opleiding: this.introForm.get('opleidingen').value,
      taalvoorkeur: this.introForm.get('talen').value,
      beschrijving: this.introForm.get('beschrijving').value,
      skills: this.selectedUsers.map(k => Object.values(k)[1]),
      photo: this.uploadFileName,
      naam: this.name,
      campus: this.introForm.get('campusen').value,
      role: this.rol,
      userId: this.userId,
    };

    if (!this.introForm.valid) {
      console.log('something went wrong');
      return false;
    } else {
      this.next();
    }
  }

  cancel() {
    this.obsSkills = new BehaviorSubject<Skill[]>([]);
    this.selectComponent.clear();
    this.selectComponent.close();
  }

  clear() {
    this.obsSkills = new BehaviorSubject<Skill[]>([]);
    this.selectComponent.toggleItems(false);
    this.selectComponent.clear();
  }

  confirm() {
    this.selectComponent.confirm();
    console.log(this.selectedUsers);
    this.selectComponent.close();
  }

  async finish(){
    const loading = await this.loadingControl.create({
      message: 'Loading...',
      cssClass: 'custom-class'
    });
    await loading.present();
    if(this.photo !== './assets/imgs/profile.jpg'){
      this.uploadProfileToFirebase(this.image).then(res => {
        console.log(res);
        this.profile.photo = this.uploadFileName;
        console.log(this.profile);
        this.profileService
        .create(this.profile)
        .then(() => {
          this.authService.hasCompletedIntro(this.userId);
          console.log('i got here');
          //this.router.navigate(['/tabs']);
        })
        .catch((err) => {
          console.log(err);
        });
      }).then(resultaat => {
        console.log(resultaat);
        loading.dismiss();
        this.nextFinal();
      }
      );
    }

  }

  selectChange(event: {
    component: IonicSelectableComponent;
    item: any;
    isSelected: boolean;
  }) {
    if (event.isSelected === true) {
      let mySkills = this.obsSkills.getValue();
      mySkills.push(event.item);
      this.obsSkills.next(mySkills);
    } else {
      let mySkills = this.obsSkills.getValue();
      mySkills.forEach((value, id) => {
        if (value.id === event.item.id) {
          mySkills.splice(id, 1);
        }
      });
      this.obsSkills.next(mySkills);
    }
  }

  async uploadProfileToFirebase(event: Photo) {
  console.log(event);

  const blob = await (await fetch(event.dataUrl)).blob();
  const newMetadata = {
    contentType: `image/${event.format}`
  };

    const filepath = `profilePictures/${new Date().getTime()}_.${Math.random().toString(12)}_.${event.format}`;
    const task2 = this.angularFireStorage.upload(filepath,blob,newMetadata);

task2.then((res) => {
  var imagefile = res.task.snapshot.ref.getDownloadURL();
      imagefile.then((downloadableUrl) => {
        this.uploadFileName = downloadableUrl;
});
});
return true;
  }


  async openOptionSelection() {
    const modal = await this.modalController.create({
      component: ProfilePhotoOptionPage,
      cssClass: 'transparent-modal'
    });
    modal.onDidDismiss()
    .then(res => {
      if (res.role !== 'backdrop') {
        this.takePicture(res.data);
      }
    });
    return await modal.present();
  }
  async takePicture(type) {

    if(type === 'Camera' || type ==='Photos'){
      this.image = await Camera.getPhoto({
        quality: 50,
        width:250,
        height:250,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource[type]
      });
      this.photo = this.image.dataUrl;

      this.uploadProfileToFirebase(this.image);
    }else if(type=== 'Delete')
    {
    this.photo = './assets/imgs/profile.jpg';
    }
  }
}
