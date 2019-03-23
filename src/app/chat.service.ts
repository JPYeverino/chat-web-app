import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Subject<any>;
  invitation: Subject<any>;
  confirmation: Subject<any>;

  constructor(
    private wsService: WebsocketService
  ) {
    this.messages = <Subject<any>>wsService
      .message()
      .pipe(
        map((response: any): any => response)
      );

    this.invitation = <Subject<any>>wsService
      .invitation()
      .pipe(
        map((response: any): any => response)
      );

    this.confirmation = <Subject<any>>wsService
      .confirmation()
      .pipe(
        map((response: any): any => response)
      );
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  sendConfirmation() {
    this.confirmation.next();
  }
}
