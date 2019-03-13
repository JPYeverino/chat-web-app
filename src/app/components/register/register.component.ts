import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterVm, UserClient, ApiException, UserVm } from 'src/app/user.api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _userClient: UserClient,
              private _router: Router) {}

  ngOnInit() {
      this.initForm();
  }

  initForm() {
      this.form = this._formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(6)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          firstName: '',
          lastName: '',
      });
  }

  onSubmit() {
      if (this.form.invalid) {
          this.displayValidationErrors();
          return;
      }

      const registerVm: RegisterVm = new RegisterVm(this.form.value);
      this._userClient.register(registerVm)
          .pipe(catchError((err: ApiException) => throwError(err)))
          .subscribe((user: UserVm) => {
              this._router.navigate(['/login']);
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