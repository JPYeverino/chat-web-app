import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConversationStoreService } from 'src/app/conversation-store.service';
import { ConversationVm, UserVm } from 'src/app/noti.api';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/chat.service';
import { ContactsService } from 'src/app/contacts.service';
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
import { MessageStoreService } from 'src/app/message-store.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  conversations$: Observable<ConversationVm[]>;
  conversation$: Observable<ConversationVm>;


  constructor(
    private readonly _convService: ConversationStoreService,
  ) { }

  ngOnInit() {
    this.conversations$ = this._convService.getConversations();
    this._convService.loadUserConversations();
    
  }

  onSelect(conversationId) {
    this._convService.loadConversation(conversationId);
  }

}
