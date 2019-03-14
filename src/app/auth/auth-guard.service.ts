import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { 
    
  }

  canActivate(): Observable<boolean> {
    this.authService.checkLogin()
    return this.authService.isLoggedIn
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if(!isLoggedIn) {
            console.log(isLoggedIn);
            this.router.navigate(['/login'])
            return false;
          }
          return true;
        })
      );
  }
}
