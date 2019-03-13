import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserVm } from 'src/app/user.api';
import { CurrentUserService } from 'src/app/current-user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser$: Observable<UserVm>;
  isLoggedIn$: Observable<boolean>;
  cookieVal: 'UNKNOWN';

  constructor(
    private userService: CurrentUserService,
    private authService: AuthService,
    private cookieService: CookieService
  ) { 
    
  }

  ngOnInit() {
    this.appUser$ = this.userService.appUser$;
    this.isLoggedIn$ = this.authService.isLoggedIn;

  }

  onLogoutClick() {
    console.log('logout');
    this.authService.logout();
}

}
