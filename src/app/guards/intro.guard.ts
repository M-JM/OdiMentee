import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User} from '../services/user.model';




@Injectable({
  providedIn: 'root'
})


export class IntroGuard implements CanLoad {

  profilex: User;
  hasSeenIntro: boolean;
  constructor(private router: Router, private auth: AuthService){ }

  async canLoad(): Promise<boolean> {
   this.hasSeenIntro = await this.auth.hasSeenIntro();
    if (this.hasSeenIntro) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl:true });
      return false;
    }
}
}
