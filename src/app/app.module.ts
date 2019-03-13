import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { API_BASE_URL } from './user.api';
import { ProfileComponent } from './components/profile/profile.component';
registerLocaleData(en);
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { SearchContactsComponent } from './components/search-contacts/search-contacts.component';
import { ContactListComponent } from './components/search-contacts/contact-list/contact-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatService } from './chat.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { ConversationsComponent } from './components/search-contacts/conversations/conversations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    SearchContactsComponent,
    ContactListComponent,
    ChatWindowComponent,
    ConversationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimengModule
  ],
  providers: [
    CookieService,
    ChatService,
    AuthService,
    AuthGuardService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: API_BASE_URL, useFactory: baseUrl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function baseUrl(): string {
  return window.location.origin + '/users';
}
