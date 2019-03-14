import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserVm } from 'src/app/user.api';
import { CurrentUserService } from 'src/app/current-user.service';
import { Observable } from 'rxjs';

import { AddContactVm } from 'src/app/noti.api';
import { ConversationStoreService } from 'src/app/conversation-store.service';
import { ContactsService } from 'src/app/contacts.service';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input()
  contacts: UserVm[];

  constructor(
    private readonly currentUser: CurrentUserService,
    private readonly contactSvs: ContactsService,
    private readonly _cnvStore: ConversationStoreService,
    private readonly chat: ChatService
  ) { }

  ngOnInit() {
  }

  addContact(user: UserVm) {
    const addUser = new AddContactVm();
    addUser.toAddContact = user.id;
    this.contactSvs.addContact(addUser);
    this.contactSvs.loadContacts();
  }

}
