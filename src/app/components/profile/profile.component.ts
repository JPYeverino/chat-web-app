import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserClient, ApiException, UserVm } from 'src/app/user.api';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserService } from 'src/app/current-user.service';
import { ConversationStoreService } from 'src/app/conversation-store.service';
import { ChatService } from 'src/app/chat.service';
import { ContactsService } from 'src/app/contacts.service';
// import { ChatService } from 'src/app/chat.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  appUser$: Observable<UserVm>;
  chatSubscription: Subscription;

  constructor( 
    private _router: Router,
    private userService: CurrentUserService,
    private cnvStore: ConversationStoreService,
    private readonly chat: ChatService,
    private readonly contacts: ContactsService
  ) { }

  ngOnInit() {
    this.chatSubscription = this.chat.invitation.subscribe(data => {
      console.log(data);
      this.contacts.loadContacts();
    });
    // this.chat.confirmation.subscribe(data => console.log(data));
    this.appUser$ = this.userService.getUser();
    this.userService.loadUser();
    this.cnvStore.loadUserConversations();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.chatSubscription.unsubscribe();
  }
}
