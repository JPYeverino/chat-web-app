import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url= '/io';
  private socket;

  constructor() { 
    this.socket = io({'path': this.url});
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }
}
