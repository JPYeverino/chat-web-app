import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable, Subject } from 'rxjs';
import { MessageStoreService } from './message-store.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private url = '/io';
  private socket;

  constructor() { }

  initSocket(): void {
    this.socket = io('/notif', { path: this.url, });
  }

  message(): Subject<MessageEvent> {

    let observable = new Observable(observer => {
      this.socket.on('newUser', data => {
        console.log("Received message from Websocket Server");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('newUser', JSON.stringify(data));
      }
    };

    return Subject.create(observer, observable);
  }

  confirmation(): Subject<MessageEvent> {

    let observable = new Observable(observer => {
      this.socket.on('invitationAccepted', data => {
        console.log("Received message from Websocket Server");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('invitationAccepted', JSON.stringify(data));
      }
    };

    return Subject.create(observer, observable);
  }

  invitation(): Subject<MessageEvent> {

    let observable = new Observable(observer => {
      this.socket.on('invitationReceived', data => {
        console.log("Received message from Websocket Server");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('invitationReceived', JSON.stringify(data));
      }
    };

    return Subject.create(observer, observable);

  }
}
