import { Injectable } from '@angular/core';
import { UserClient } from 'src/app/user.api';
import { UserNotiClient, ConversationNotiClient, MessageNotiClient, MessageVm } from 'src/app/noti.api';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private _userClient: UserClient,
    private _notiUser: UserNotiClient,
    private _notiConv: ConversationNotiClient,
    private _notiMsg: MessageNotiClient
  ) { }

  getUsers(search: string) {
    return this._userClient.userslist(search);
  }

  getContacts() {
    return this._notiUser.getUserContacts();
  }

  getConversations() {
    return this._notiConv.getUsersConversation();
  }

}
