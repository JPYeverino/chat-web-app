import { Component, OnInit, OnDestroy, ViewChildren, AfterViewInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { CurrentUserService } from 'src/app/current-user.service';
import { UserVm } from 'src/app/user.api';
import { Observable, Subscription } from 'rxjs';
import { MessageVm, ConversationVm } from 'src/app/noti.api';
import { MessageStoreService } from 'src/app/message-store.service';
import { ConversationStoreService } from 'src/app/conversation-store.service';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren("messageContainer") messageContainers;

  replyMessage = '';
  appUser$: Observable<UserVm>;
  private messages$: Observable<MessageVm[]>;
  private conversation$: Observable<ConversationVm>;
  private conversationSubscription: Subscription;
  private conversation: string;

  constructor(
    private _userService: CurrentUserService,
    private _msgService: MessageStoreService,
    private _cnvService: ConversationStoreService,
    private _chat: ChatService
  ) { }

  ngOnInit() {
    this.appUser$ = this._userService.getUser();
    this.messages$ = this._msgService.getMessages();
    this.conversation$ = this._cnvService.getConversation();
    this.conversationSubscription = this._cnvService.getConversation().subscribe(cnv => {
      if (!cnv) {
        return
      }
      console.log(cnv.id);
      this.conversation = cnv.id;
      this._msgService.loadMessages(cnv.id);
    });
    this._chat.messages.subscribe(data => {
      const cnv = data['conversation']._id
      if(cnv === this.conversation) {
        this._msgService.loadMessages(cnv);
      } else {
        console.log(`New message from ${cnv}`);
      }
    });
  }

  ngAfterViewInit() {
    // this.scrolltoBottom()
  }

  reply(conversationId: string, userId: string) {
    const message = {
      author: userId,
      content: this.replyMessage,
      conversation: conversationId,
      seen: [userId]
    };
    const toSendMessage = new MessageVm(message);
    this._msgService.newMessage(toSendMessage);
    this.replyMessage = "";
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.conversationSubscription.unsubscribe();
  }

  



}
