import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConversationStoreService } from 'src/app/conversation-store.service';
import { ConversationVm, UserVm } from 'src/app/noti.api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  conversations$: Observable<ConversationVm[]>;
  conversation$: Observable<ConversationVm>

  constructor(
    private readonly _convService: ConversationStoreService
  ) { }

  ngOnInit() {
    this.conversations$ = this._convService.getConversations();
    this._convService.loadUserConversations();
  }

  onSelect(conversationId) {
    this._convService.loadConversation(conversationId);
  }

}
