import { Component, OnInit } from '@angular/core';
import { UserClient, ApiException, UserVm } from 'src/app/user.api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/chat.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  actualUser: UserVm;

  constructor(
    private _userClient: UserClient, 
    private _router: Router, 
    private cs: CookieService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    
    this.getUser();
    console.log(this.cs.get('SESSIONID'));
    
  }

  getUser() {
    
    this._userClient.getuser()
      .subscribe((user: UserVm) => {
        this.actualUser = user;
        this.chatService.sendMessage('connected');
      });
    
    
  }

    
  

}
