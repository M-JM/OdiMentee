import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController, IonSpinner } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.model';

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
      message: 'Loading...',
      cssClass: 'custom-class'
    });
    await loading.present();
    this.auth.signIn(this.loginForm.value).subscribe(
      (user: User) => {
        loading.dismiss();
        console.log('User',user);
        const role = user.role;
        this.auth.setUser({
          key: user.key,
          created: user.created,
          firstName: user.firstName,
          lastName: user.lastName,
          hasCompletedIntro: user.hasCompletedIntro,
          permissions: user.permissions,
          role: user.role
        });
        if (role === 'USER') {
          this.router.navigateByUrl('/tabs');
        } else if (role === 'ADMIN') {
          this.router.navigateByUrl('/admin');
        }
      },
      async err => {
        loading.dismiss();
        const alert = await this.alertControl.create({
          header: 'ongeldige login pogin',
          message: 'Fout opgetreden in username/wachtwoord',
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

async openReset() {
  const inputAlert = await this.alertControl.create({
    header: 'Reset Password',
    inputs: [
      {
        name: 'email',
        placeholder: 'Email'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Reset',
        handler: data => {
          this.resetPw(data.email);
        }
      }
    ]
  });
  inputAlert.present();
}

resetPw(email) {
  this.auth.resetPw(email).then(
    async res => {
      const toast = await this.toastControl.create({
        duration: 3000,
        message: 'Success! Check je email.'
      });
      toast.present();
    },
    async err => {
      const alert = await this.toastControl.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    }
  );
}

}
