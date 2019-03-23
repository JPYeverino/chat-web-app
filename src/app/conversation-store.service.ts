import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConversationNotiClient, AddContactVm, ConversationVm } from './noti.api';
import { UserVm } from './user.api';

@Injectable({
  providedIn: 'root'
})
export class ConversationStoreService {
  private listSubject = new BehaviorSubject([]);
  private individualSubject = new BehaviorSubject(undefined);
  private conversations = [];
  private selectedConversation: ConversationVm;



  constructor(
    private readonly _cnvService: ConversationNotiClient
  ) { }

  getConversations(): Observable<ConversationVm[]> {
    return this.listSubject.asObservable();
  }

  getConversation(): Observable<ConversationVm> {
    return this.individualSubject.asObservable();
  }

  private refreshList() {
    this.listSubject.next(this.conversations);
  }

  private refreshIndividual() {
    this.individualSubject.next(this.selectedConversation);
  }
  
  loadUserConversations() {
    this._cnvService.getUsersConversation()
      .subscribe(conversations => {
        this.conversations = conversations;
        this.refreshList();
      });
      
  }

  newConversation(contactId: AddContactVm) {
    this._cnvService.newConversation(contactId).subscribe(cnv => {
      this.loadUserConversations();
    });
  }

  loadConversation(conversationId: string) {
    this._cnvService.getConversation(conversationId)
      .subscribe(cnv => {
        // console.log(cnv)
        this.selectedConversation = cnv;
        this.refreshIndividual()
      });
  }
}
