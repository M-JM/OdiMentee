/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private alertControl: AlertController,
    private toastControl: ToastController,
    private router: Router,
    private loadingControl: LoadingController
    ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
    });
  }

  async register(){
  const loading = await this.loadingControl.create({
    message: 'loading...'
  });
  
  await loading.present();

this.auth.signUp(this.registerForm.value).then(async res => {
  loading.dismiss();

  const toast = await this.toastControl.create({
    duration: 2500,
    message: 'Account succesvol aangemaakt.'
  });
  toast.present();
  this.router.navigateByUrl('/login');
},
async err => {
  loading.dismiss();
const alert = await this.alertControl.create({
  header: 'Fout',
  message: err.message,
  buttons: ['ok']
});
alert.present();
}
);


}



}
