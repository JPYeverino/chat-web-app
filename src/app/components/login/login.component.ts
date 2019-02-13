import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginVm, UserClient, ApiException } from 'src/app/user.api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _userClient: UserClient,
              private _router: Router) {}

  ngOnInit() {
      this.initForm();
  }

  private initForm() {
      this.form = this._formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(6)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  onSubmit() {
      if (this.form.invalid) {
          this.displayValidationErrors();
          return;
      }
      
      
      const loginVm: LoginVm = new LoginVm(this.form.value);
      this._userClient.login(loginVm)
          .pipe(catchError((err: ApiException) => throwError(err)))
          .subscribe((data) => {
              this._router.navigate(['/profile']);
          }, (err: ApiException) => {
              console.log(err);
          });
  }

  private displayValidationErrors() {
      const formKeys = Object.keys(this.form.controls);
      formKeys.forEach(key => {
          this.form.controls[key].markAsDirty();
          this.form.controls[key].updateValueAndValidity();
      });
  }
}