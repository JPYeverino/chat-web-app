import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserVm } from 'src/app/user.api';
import { CurrentUserService } from 'src/app/current-user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input()
  contacts: UserVm[];
  
  @Output() click = new EventEmitter();

  constructor(
    private readonly currentUser: CurrentUserService
  ) { }

  ngOnInit() {
  }

  onSelect(user: UserVm) {
    let cuser;
    this.currentUser.appUser$.subscribe(data =>{
      cuser = data.id;
    });
    console.log('Select conversation', JSON.stringify(user));
    console.log('App user ', cuser);

  }

  addContact(event: Event, user: UserVm) {
    event.stopPropagation();
    this.click.next();
    console.log('Add contact', JSON.stringify(user));
  }

}
