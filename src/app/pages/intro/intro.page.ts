import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController, IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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


  introForm1: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private alertControl: AlertController,
    private toastControl: ToastController,
    private router: Router,
    private loadingControl: LoadingController) { }

  ngOnInit() {
this.talen = [
  'Nederlands',
  'Engels'
];

this.opleidingen = [
  'ICT',
  'ICT-Graduaat',
  'ICT-Elektronica'
];

this.opleidingenGraad = [
  '1ste',
  '2de',
  '3de',
  '4de'
];

    this.introForm1 = new FormGroup({
      talen: new FormControl(this.talen[0], Validators.required),
      opleidingen: new FormControl(this.opleidingen[0], Validators.required),
      opleidingenGraad: new FormControl(this.opleidingenGraad[0], Validators.required)
    });
  }

  next() {
    console.log(this.introForm1);
    this.slides.slideNext();
  }

  onSubmit(values) {
    console.log(values);
  }
}
