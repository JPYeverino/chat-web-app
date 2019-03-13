import { Injectable } from '@angular/core';
import { UserClient, LoginVm, ApiException } from '../user.api';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private userService: UserClient,
    private _router: Router,
    private cookieService: CookieService
  ) { }

  login(user: LoginVm) {
    
    this.userService.login(user)
      .pipe(catchError((err: ApiException) => throwError(err)))
      .subscribe((data) => {
        this.loggedIn.next(true);
        this._router.navigate(['/profile']);
      }, (err: ApiException) => {
        console.log(err);
      });
  }

  logout() {
    this.loggedIn.next(false);
    this._router.navigate(['/login']);
  }
}
