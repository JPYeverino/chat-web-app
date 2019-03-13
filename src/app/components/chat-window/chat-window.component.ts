import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { CurrentUserService } from 'src/app/current-user.service';
import { UserVm } from 'src/app/user.api';
import { Observable } from 'rxjs';
import { MessageVm, ConversationVm } from 'src/app/noti.api';
import { ContactsService } from '../search-contacts/contacts.service';
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
    private _contactService: ContactsService,
    private _msgService: MessageStoreService,
    private _cnvService: ConversationStoreService,
    private chat: ChatService
  ) {
    this.appUser$ = _userService.appUser$;
    

  }
  //TODO: get conversation through a Service
  ngOnInit() {
    this.messages$ = this._msgService.getMessages();
    this.conversation$ = this._cnvService.getConversation();
    this._cnvService.getConversation().subscribe(cnv => {
      if(!cnv) {
        return
      }
      console.log(cnv.id);
      this._msgService.loadInitialData(cnv.id);
    });

    
    this.chat.messages.subscribe(data=> {
      console.log(data.conversation);
      this._msgService.loadInitialData(data.conversation);
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
