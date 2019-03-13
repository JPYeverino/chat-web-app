import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { UserVm } from 'src/app/user.api';
import { Observable, fromEvent } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { ConversationStoreService } from 'src/app/conversation-store.service';
import { ConversationVm } from 'src/app/noti.api';
import { CurrentUserService } from 'src/app/current-user.service';

@Component({
  selector: 'app-search-contacts',
  templateUrl: './search-contacts.component.html',
  styleUrls: ['./search-contacts.component.css']
})
export class SearchContactsComponent implements AfterViewInit, OnInit {
  conversations$: Observable<ConversationVm[]>;
  contacts: UserVm[];
  contacts$: Observable<UserVm[]>;
  isSearching: boolean = false;
  conversations = [];
  appUser$: Observable<UserVm>
  appUser;

  constructor(
    private contactsService: ContactsService,
    private readonly _convService: ConversationStoreService,
    private userService: CurrentUserService,
  ) { 
    this.reload();
    this.appUser$ = userService.appUser$;
  }

  ngOnInit() {
    this.appUser$.subscribe(data=> {
      // console.log(data)
      this.appUser = data;
    });

    this.conversations$ = this._convService.getConversations()
    
    this._convService.loadUserConversations();

    // this.contactsService.getContacts().subscribe(data => console.log(data));
  }

  onClick() {
    const input:any = document.getElementById('search');
    input.value = '';
    this.contacts = [];
  }

  reload() {
    this.contacts = [];
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    const input:any = document.getElementById('search');
    const search$ = fromEvent(input, 'keyup')
      .pipe(
        switchMap(() => {
          if(input.value.length > 0) {
            return this.contactsService.getUsers(input.value);
          } else return this.contactsService.getUsers('-');
        })
      )

    search$.subscribe(users => this.contacts = users);
  }
}
