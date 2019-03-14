import { Injectable } from '@angular/core';
import { UserClient, UserVm } from 'src/app/user.api';
import { UserNotiClient, ConversationNotiClient, MessageNotiClient, MessageVm, AddContactVm } from 'src/app/noti.api';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactsSubject = new BehaviorSubject([]);
  private contacts: UserVm[] = [];


  constructor(
    private _notiUser: UserNotiClient,
  ) { }

  getUsers(search: string) {
    if(search.length > 0) {
      return this._notiUser.usersList(search);
    }

    return [];
  }

  getContacts() {
    return this.contactsSubject.asObservable();
  }

  private refresh() {
    this.contactsSubject.next(this.contacts);
  }

  
  loadContacts() {
    this._notiUser.getUserContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
        this.refresh()
      });
    
  }

  addContact(contactId: AddContactVm ) {
    this._notiUser.addContact(contactId)
      .subscribe(contact => {
        this.contacts.push(contact);
        this.refresh();
      });
    
  }

  confirmContact(contactId: AddContactVm) {
    this._notiUser.setContactStatus(contactId)
      .subscribe();
      this.refresh();
  }

}
