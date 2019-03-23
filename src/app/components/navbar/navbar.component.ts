import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserVm } from 'src/app/user.api';
import { CurrentUserService } from 'src/app/current-user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser$: Observable<UserVm>;
  isLoggedIn$: Observable<boolean>;
  cookieVal: 'UNKNOWN';
  items2: MenuItem[];

  constructor(
    private userService: CurrentUserService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.items2 = [
      {label: 'Home', icon: 'fa fa-fw fa-bar-chart', routerLink: '/', routerLinkActiveOptions: '{exact: true}'},
      {label: 'Register', icon: 'fa fa-fw fa-calendar', routerLink: '/register', routerLinkActiveOptions: '{exact: true}'},
      {label: 'Login', icon: 'fa fa-fw fa-book', routerLink: '/login', routerLinkActiveOptions: '{exact: true}'},
      {label: 'Dashboard', icon: 'fa fa-fw fa-support', routerLink: '/profile', routerLinkActiveOptions: '{exact: true}'},
  ];

  // this.activeItem = this.items2[0];
    this.appUser$ = this.userService.getUser();
    this.isLoggedIn$ = this.authService.isLoggedIn;

  }

  onLogoutClick() {
    console.log('logout');
    this.authService.logout();
}

}
