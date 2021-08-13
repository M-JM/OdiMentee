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
import { IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Skill } from 'src/app/services/skill.model';
import { BehaviorSubject } from 'rxjs';

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
  skills: any;
  tests: any;
  userId: any;
  fileName: string;
  uploadFileName: any;
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
    private angularFireStorage: AngularFireStorage
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

    this.campus = ['Brussel', 'Mechelen', 'Schaarbeek'];

    this.opleidingenGraad = ['1ste', '2de', '3de', '4de'];

    this.skills = ['C#', 'JAVA', 'SQL', 'Angular', 'Ionic'];

    this.introForm1 = new FormGroup({
      talen: new FormControl(this.talen[0], Validators.required),
      opleidingen: new FormControl(this.opleidingen[0], Validators.required),
      opleidingenGraad: new FormControl(
        this.opleidingenGraad[0],
        Validators.required
      ),
      tests: new FormControl(this.tests),
    });
    this.introForm2 = new FormGroup({
      skills: new FormControl(this.skills[0]),
      beschrijving: new FormControl(''),
    });
  }

  next() {
    this.slides.slideNext();
  }

  onSubmit() { }
  onSubmit2() {
    const profile: Profile = {
      opleidingsfase: this.introForm1.get('opleidingenGraad').value,
      opleiding: this.introForm1.get('opleidingen').value,
      taalvoorkeur: this.introForm1.get('talen').value,
      beschrijving: this.introForm2.get('beschrijving').value,
      skills: this.introForm2.get('skills').value,
      photo: this.uploadFileName,
      campus: 'test',
      role: 'mentee',
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

  // searchPorts(event: {
  //   component: IonicSelectableComponent;
  //   text: string;
  // }) {
  //   let text = event.text.trim().toLowerCase();
  //   console.log(text);
  //   event.component.startSearch();

  //   // Close any running subscription.
  //   if (this.tests) {
  //     this.tests.unsubscribe();
  //   }

  //   if (!text) {
  //     // Close any running subscription.
  //     if (this.tests) {
  //       this.tests.unsubscribe();
  //     }

  //     event.component.items = [];
  //     event.component.endSearch();
  //     return;
  //   }

  //   this.tests = this.profileService.getSkills().subscribe(skills => {
  //     // Subscription will be closed when unsubscribed manually.
  //     if (this.tests.closed) {
  //       return;
  //     }

  //     // We get all ports and then filter them at the front-end,
  //     // however, filtering can be parameterized and moved to a back-end.
  //     event.component.items = this.filterPorts(skills, text);
  //     event.component.endSearch();
  //   });
  // }

  // filterPorts(skills: Skill[], text: string) {
  //   return skills.filter(skill => skill.naam.toLowerCase().indexOf(text) !== -1);
  // }
}
