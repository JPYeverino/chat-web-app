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

  constructor(
    private wsService: WebsocketService
  ) {

    wsService.initSocket();
    this.messages = <Subject<any>>wsService
      .message()
      .pipe(
        map((response: any): any => response)
      );
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }
}
