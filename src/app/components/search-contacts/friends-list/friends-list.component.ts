import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';
import { Observable } from 'rxjs';
import { UserVm } from 'src/app/user.api';
import { AddContactVm } from 'src/app/noti.api';
import { ConversationStoreService } from 'src/app/conversation-store.service';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  contacts$: Observable<UserVm[]>

  constructor(
    private readonly contacts_service: ContactsService,
    private readonly cnvStore: ConversationStoreService,
    private readonly chat: ChatService
  ) { }

  ngOnInit() {
    this.contacts$ = this.contacts_service.getContacts();
    this.contacts_service.getContacts();
    this.contacts_service.loadContacts();
  }

  confirm(contactId: string) {
    const confirmContact = new AddContactVm();
    confirmContact.toAddContact = contactId;
    this.contacts_service.confirmContact(confirmContact);
    this.cnvStore.newConversation(confirmContact);

  }

}
