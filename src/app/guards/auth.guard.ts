/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private db: AngularFirestore){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data.role;
      console.log('verwachte', expectedRole);
      return this.auth.user$.pipe(
        take(1),
        map(user => {
          if (!user) {
            this.router.navigateByUrl('/login');
            return false;
          } else {
            const role = user['role'];
            if (expectedRole === role) {
              return true;
            } else {
              this.router.navigateByUrl('/login');
              return false;
            }
          }
        })
      );
  }
}
