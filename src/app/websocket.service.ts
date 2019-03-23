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

  constructor() { 
    this.socket = io('/notif', { path: this.url });
  }

  

  message(): Subject<MessageEvent> {
    this.socket.on('connected', data => console.log(data));

    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("received message from Websocket Server")
        observer.next(data);
      });
       return () => {
        observer.unsubscribe();
      }
    });

    let observer = {
      next: (data) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    }
    return Subject.create(observer, observable);
  }

  invitation(): Subject<MessageEvent> {
    this.socket.on('connected', data => console.log(data));

    let observable = new Observable(observer => {
      this.socket.on('invitation', (data) => {
        console.log("received message from Websocket Server")
        observer.next(data);
      });
      return () => {
        observer.unsubscribe();
      }
    });

    let observer = {
      next: (data) => {
        this.socket.emit('invitation', JSON.stringify(data));
      }
    }
    return Subject.create(observer, observable);
  }

  confirmation(): Subject<MessageEvent> {
    this.socket.on('connected', data => console.log(data));

    let observable = new Observable(observer => {
      this.socket.on('confirmation', (data) => {
        console.log("received message from Websocket Server")
        observer.next(data);
      });
      return () => {
        observer.unsubscribe();
      }
    });

    let observer = {
      next: (data) => {
        console.log(`observer emit`)
        this.socket.emit('joinRooms');
      } 
    }
    return Subject.create(observer, observable);
  }
}
