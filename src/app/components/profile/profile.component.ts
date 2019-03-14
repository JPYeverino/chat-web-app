import { Component, OnInit } from '@angular/core';
import { UserClient, ApiException, UserVm } from 'src/app/user.api';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserService } from 'src/app/current-user.service';
import { ConversationStoreService } from 'src/app/conversation-store.service';
// import { ChatService } from 'src/app/chat.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  appUser$: Observable<UserVm>;

  constructor( 
    private _router: Router,
    private userService: CurrentUserService,
    private cnvStore: ConversationStoreService
  ) { }

  ngOnInit() {
    this.appUser$ = this.userService.getUser();
    this.userService.loadUser();
    this.cnvStore.loadUserConversations();
  }
}
