import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageVm, MessageNotiClient } from './noti.api';
import { nextContext } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class MessageStoreService {
  private messagesSubject = new BehaviorSubject([]);
  private messages: MessageVm[];

  constructor(
    private readonly _msgService: MessageNotiClient
  ) {}

  getMessages(): Observable<MessageVm[]> {
    return this.messagesSubject.asObservable()
  }

  private refresh() {
    this.messagesSubject.next(this.messages);
  }

  newMessage(message: MessageVm) {
    this._msgService.newMessage(message)
    .subscribe(message => {
      this.messages.push(message)
    });
    this.refresh();
  }

  loadMessages(conversation: string) {
    this._msgService.conversationsMessages(conversation)
      .subscribe( msgs =>{
        this.messages = msgs;
        this.refresh();
      });    
  }
}
