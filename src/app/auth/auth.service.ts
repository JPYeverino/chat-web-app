import { Injectable } from '@angular/core';
import { UserClient, LoginVm, ApiException } from '../user.api';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserService } from '../current-user.service';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private logged = false;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  refresh() {
    this.loggedIn.next(this.logged);
  }

  checkLogin() {
    this.userService.auth()
      .subscribe(data => {
        if(data.id) {
          this.logged = true;
          this.refresh()
        } else {
          this.logged = false;
          this.refresh;
        }
      });
  }

  constructor(
    private userService: UserClient,
    private _router: Router,
    private _appUser: CurrentUserService,
  ) { }

  login(user: LoginVm) {
    
    this.userService.login(user)
      .pipe(catchError((err: ApiException) => throwError(err)))
      .subscribe((data) => {
        this.logged = true;
        this.refresh();
        this._router.navigate(['/profile']);
        
      }, (err: ApiException) => {
        console.log(err);
      });
  }

  logout() {
    this._router.navigate(['/login']);
  }
}
