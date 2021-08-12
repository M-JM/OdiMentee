/* eslint-disable no-var */
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from './../../services/profile.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController, IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})


export class IntroPage implements OnInit {
  @ViewChild(IonSlides)slides: IonSlides;

  talen: Array<string>;
  opleidingen: Array<string>;
  opleidingenGraad: Array<string>;
  skills: Array<string>;
  userId: any;
  fileName: string;
  uploadFileName: any;

  introForm1: FormGroup;
  introForm2: FormGroup;
  imageUpload: AngularFireUploadTask;
  campus: string[];

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage) {
     }

  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid; }
    });


this.talen = [
  'Nederlands',
  'Engels'
];

this.opleidingen = [
  'ICT',
  'ICT-Graduaat',
  'ICT-Elektronica'
];

this.campus = [
  'Brussel',
  'Mechelen',
  'Schaarbeek'
];

this.opleidingenGraad = [
  '1ste',
  '2de',
  '3de',
  '4de'
];

this.skills = [
  'C#',
  'JAVA',
  'SQL',
  'Angular',
  'Ionic'
];

    this.introForm1 = new FormGroup({
      talen: new FormControl(this.talen[0], Validators.required),
      opleidingen: new FormControl(this.opleidingen[0], Validators.required),
      opleidingenGraad: new FormControl(this.opleidingenGraad[0], Validators.required)
    });
    this.introForm2 = new FormGroup({
      skills: new FormControl(this.skills[0]),
      beschrijving: new FormControl('')
    });
  }

  next() {
    this.slides.slideNext();
  }

  onSubmit() {
  }
  onSubmit2() {

    const profile: Profile = {
      opleidingsfase: this.introForm1.get('opleidingenGraad').value,
      opleiding: this.introForm1.get('opleidingen').value,
      taalvoorkeur: this.introForm1.get('talen').value,
      beschrijving: this.introForm2.get('beschrijving').value,
      skills: this.introForm2.get('skills').value,
      photo: this.uploadFileName,
      campus:'test',
      role:'mentee',
      userId:this.userId
    };

    if (!this.introForm1.valid) {
      console.log('something went wrong');
      return false;
    } else {
      this.profileService.create(profile)
      .then(() => {
        this.authService.hasCompletedIntro(this.userId);
        this.router.navigate(['/tabs']);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  uploadProfileToFirebase(event){
    const file = event.target.files;
    console.log(file);
    // eslint-disable-next-line no-var
    var fileName = file[0];
    console.log(fileName);

    if(fileName.type.split('/')[0] !=='image'){
      console.log('file is not an image');
      return;
    }

    const path = `profilePictures/${new Date().getTime()}_${fileName.name}`;

    // eslint-disable-next-line no-var
    var fileRef = this.angularFireStorage.ref(path);
    this.imageUpload = this.angularFireStorage.upload(path,fileName);

    this.imageUpload.then( res => {
      var imagefile = res.task.snapshot.ref.getDownloadURL();
     imagefile.then( downloadableUrl => {
       console.log('url', downloadableUrl);
       this.uploadFileName = downloadableUrl;
     });
    });

  }

  }

