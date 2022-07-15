import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-demo7',
  template: `
    <h1>Async Validator</h1>

    <form [formGroup]="form" (submit)="save()" class="form-group form-inline">
      <input class="form-control"
             type="text"
             formControlName="name"
             placeholder="Search username"
      >

      <button class="btn btn-primary" type="button" [disabled]="form.invalid || form.pending">
        <span class="spinner-border spinner-border-sm" *ngIf="form.get('name')?.pending"></span>
        {{form.pending? 'LOADING' : 'CONFIRM'}}
      </button>

      <p class="text-danger" *ngIf="form.get('name')?.errors?.['minlength']">
        Too short. Min 3 characters
      </p>

      <p class="text-danger" *ngIf="form.get('name')?.errors?.['notAvailable']">
        Username Not available
      </p>

      <hr>
      <small>NOTE: Bret, Samantha, Karianne are already taken. Try them</small>
    </form>
  `,
})
export class Demo7Component {
  form = this.fb.group({
    name: [
      '',
      // sync built-in validators
      [ Validators.required, Validators.minLength(3) ],
      // custom async validator
      this.userValidator.checkUniqueName()
    ],
  });

  constructor(
    private fb: FormBuilder,
    private userValidator: UserValidator
  ) { }

  save() {
    console.log(this.form.value)
  }
}


// ASYNC VALIDATOR SERVICE
const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class UserValidator {

  constructor(private http: HttpClient) {}

  checkUniqueName(): AsyncValidatorFn  {
    return (control: AbstractControl) => {
      return timer(1000)
        .pipe(
          switchMap(() => this.http.get<any>(`${URL}/users?username=${control.value}`)),
          map(res => res.length ? { notAvailable: true } : null)
        );
    };
  }
}
