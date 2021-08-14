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
import { Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
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
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  talen: Array<string>;
  opleidingen: Array<string>;
  opleidingenGraad: Array<string>;
  campusen: Array<string>;
  skills: any;
  tests: any;
  rol: any;
  userId: any;
  fileName: string;
  uploadFileName: any;
  photo: any = './assets/imgs/profile.jpg';
  toggle = true;
  selectedUsers = null;
  obsSkills = new BehaviorSubject<Skill[]>([]);

  introForm1: FormGroup;
  introForm2: FormGroup;
  imageUpload: AngularFireUploadTask;
  campus: string[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private angularFireStorage: AngularFireStorage,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
      this.profileService.getSkills().subscribe((res) => {
        this.tests = res;
        console.log(res);
        console.log(this.tests);
      });
    });

    this.talen = ['Nederlands', 'Engels'];

    this.opleidingen = ['ICT', 'ICT-Graduaat', 'ICT-Elektronica'];

    this.campusen = ['Brussel', 'Mechelen', 'Schaarbeek'];

    this.opleidingenGraad = ['1ste', '2de', '3de', '4de'];

    this.skills = ['C#', 'JAVA', 'SQL', 'Angular', 'Ionic'];

    this.introForm1 = new FormGroup({
      talen: new FormControl('', Validators.required),
      opleidingen: new FormControl('', Validators.required),
      opleidingenGraad: new FormControl('',Validators.required),
      tests: new FormControl(this.tests),
      campusen: new FormControl('',Validators.required),
      beschrijving: new FormControl('')
    });
    this.introForm2 = new FormGroup({
      skills: new FormControl(this.skills[0]),
      beschrijving: new FormControl(''),
    });
  }

  next() {
    this.slides.slideNext();
  }

  selectRol(rol: string){
    this.rol = rol;
    this.next();
  };


  onSubmit() {
    const profile: Profile = {
      opleidingsfase: this.introForm1.get('opleidingenGraad').value,
      opleiding: this.introForm1.get('opleidingen').value,
      taalvoorkeur: this.introForm1.get('talen').value,
      beschrijving: this.introForm1.get('beschrijving').value,
      skills: this.introForm2.get('skills').value,
      photo: this.uploadFileName,
      campus: this.introForm1.get('campusen').value,
      role: this.rol,
      userId: this.userId,
    };

    if (!this.introForm1.valid) {
      console.log('something went wrong');
      return false;
    } else {
      this.profileService
        .create(profile)
        .then(() => {
          this.authService.hasCompletedIntro(this.userId);
          this.router.navigate(['/tabs']);
        })
        .catch((err) => {
          console.log(err);
        });
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

  toggleItems() {
    this.selectComponent.toggleItems(this.toggle);
    this.toggle = !this.toggle;
  }

  confirm() {
    this.selectComponent.confirm();
    console.log(this.selectedUsers);
    this.selectComponent.close();
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
        console.log(id);
        console.log(value.id);
        console.log(event.item.id);
        if (value.id === event.item.id) {
          mySkills.splice(id, 1);
        }
      });
      this.obsSkills.next(mySkills);
    }
    console.log(this.obsSkills);
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

    // eslint-disable-next-line no-var
    var fileRef = this.angularFireStorage.ref(path);
    this.imageUpload = this.angularFireStorage.upload(path, fileName);

    this.imageUpload.then((res) => {
      var imagefile = res.task.snapshot.ref.getDownloadURL();
      imagefile.then((downloadableUrl) => {
        console.log('url', downloadableUrl);
        this.uploadFileName = downloadableUrl;
      });
    });
  }


  async openOptionSelection() {
    const modal = await this.modalController.create({
      component: ProfilePhotoOptionPage,
      cssClass: 'transparent-modal'
    });
    modal.onDidDismiss()
    .then(res => {
      console.log(res);
      if (res.role !== 'backdrop') {
        this.takePicture(res.data);
      }
    });
    return await modal.present();
  }
  async takePicture(type) {
    if(type === 'Camera' || type ==='Photos'){
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource[type]
      });
      this.photo = image.webPath;
    }else if(type=== 'Delete')
    {
    this.photo = './assets/imgs/profile.jpg';
    }else{
      this.photo = type;
    } ;
  }


}
