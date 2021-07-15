import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private alertControl: AlertController,
    private toastControl: ToastController,
    private router: Router,
    private loadingControl: LoadingController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  async login() {
    const loading = await this.loadingControl.create({
      message: 'Loading...'
    });
    await loading.present();
    this.auth.signIn(this.loginForm.value).subscribe(
      user => {
        loading.dismiss();
        console.log('User',user);
        const role = user.role;
        if (role === 'USER') {
          this.router.navigateByUrl('/tabs');
        } else if (role === 'ADMIN') {
          this.router.navigateByUrl('/admin');
        }
      },
      async err => {
        loading.dismiss();
        const alert = await this.alertControl.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }


}
