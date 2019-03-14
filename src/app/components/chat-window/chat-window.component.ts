import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { CurrentUserService } from 'src/app/current-user.service';
import { UserVm } from 'src/app/user.api';
import { Observable } from 'rxjs';
import { MessageVm, ConversationVm } from 'src/app/noti.api';
import { MessageStoreService } from 'src/app/message-store.service';
import { ConversationStoreService } from 'src/app/conversation-store.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  
  replyMessage = '';
  appUser$: Observable<UserVm>;
  private messages$: Observable<MessageVm[]>;
  private conversation$: Observable<ConversationVm>;

  constructor(
    private _userService: CurrentUserService,
    private _msgService: MessageStoreService,
    private _cnvService: ConversationStoreService,
    private chat: ChatService
  ) { }

  ngOnInit() {
    this.appUser$ = this._userService.getUser();
    this.messages$ = this._msgService.getMessages();
    this.conversation$ = this._cnvService.getConversation();
    this._cnvService.getConversation().subscribe(cnv => {
      if(!cnv) {
        return
      }
      console.log(cnv.id);
      this._msgService.loadMessages(cnv.id);
    });

    
    this.chat.messages.subscribe(data=> {
      this._msgService.loadMessages(data.conversation);
    });
    
  }

  reply(conversationId: string,  userId: string) {
    const message = {
      author: userId,
      content: this.replyMessage,
      conversation: conversationId,
      seen: [userId]
    };
    const toSendMessage  = new MessageVm(message);
    this._msgService.newMessage(toSendMessage);
    this.replyMessage = "";
  }

 

}
