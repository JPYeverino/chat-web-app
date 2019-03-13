import { Injectable } from '@angular/core';
import { UserClient, UserVm } from './user.api';
import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  
  appUser$: Observable<UserVm>;
  private _appUserSubject = new ReplaySubject<UserVm>(1);

  constructor(
    private _userApi: UserClient
  ) { 

    this.appUser$ = this._appUserSubject.asObservable();

    this._userApi.getuser()
      .subscribe(response => {
        const user: UserVm = response;
        this._appUserSubject.next(user);
      });
  }
  
}
