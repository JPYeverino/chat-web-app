import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ContactsService } from '../../contacts.service';
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
  
  contacts: UserVm[];
  display: boolean = false;
  friends = [];
  visibleSidebar1: boolean;

  constructor(
    private contactsService: ContactsService,
  ) { 
    this.reload();
    
  }

  ngOnInit() {
    // this.contactsService.loadContacts(); //Is not neccesary to refresh Friends List
  }

  onClick() {
    this.contactsService.loadContacts();
    const input:any = document.getElementById('search');
    input.value = '';
    this.contacts = [];
  }

  reload() {
    this.contacts = [];
  }

  buildGroup() {
    this.display = true;
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
