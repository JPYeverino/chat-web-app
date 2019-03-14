import { Injectable } from '@angular/core';
import { UserClient, UserVm } from './user.api';
import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  
  private appUserSubject = new BehaviorSubject<UserVm>(null);
  private appUser: UserVm;

  constructor(
    private _userApi: UserClient
  ) { }

  getUser() {
    return this.appUserSubject.asObservable();
  }

  private refresh() {
    this.appUserSubject.next(this.appUser);
  }

  loadUser() {
    this._userApi.getuser()
      .subscribe(user => {
        this.appUser = user;
        this.refresh();
      });
  } 


  
}
