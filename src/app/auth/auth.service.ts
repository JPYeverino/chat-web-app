import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, private cs: CookieService) { }

  public isAuthenticated(): boolean {
    const token = this.cs.get('SESSIONID')
    return !this.jwtHelper.isTokenExpired(token);
  }
}
