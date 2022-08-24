import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo6',
  template: `
    <h1>Group Validator</h1>
    <form [formGroup]="form" (submit)="save()">
      <input formControlName="username" type="text" placeholder="username">
      <div formGroupName="passwords">
        <input formControlName="password1" type="text" placeholder="Password" autocomplete="off">
        <input formControlName="password2" type="text" placeholder="Repeat Password" autocomplete="off">
        
        <hr>
        <pre>{{form.get('passwords')?.errors | json}}</pre>
        <pre>{{form.get('passwords.password1')?.errors | json}}</pre>
        <pre>{{form.get('passwords.password2')?.errors | json}}</pre>
      </div>
      <button [disabled]="form.invalid">SEND</button>
    </form>
    
    <pre>{{form.value | json}}</pre>
  `,
})
export class Demo6Component {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    passwords: this.fb.nonNullable.group(
      {
        password1: ['', [Validators.required, Validators.minLength(3)]],
        password2: ['', [Validators.required, Validators.minLength(3)]]
      },
      {
        validators: passwordMatch('password1', 'password2')
      }
    )
  })

  constructor(private fb: FormBuilder) { }

  save() {
    console.log(this.form.value)
  }

}

export function passwordMatch(p1: string, p2: string): ValidatorFn {
  return (g: AbstractControl) => {
    // console.log('passwords', g.get(p1)?.value, g.get(p2)?.value)

    if (g.get(p1)?.value !== g.get(p2)?.value) {
      // Ser error on password2 formControl
      g.get(p2)?.setErrors({ ...g.get(p2)?.errors, passwordDoesNotMatch: true})
      // set error on group
      return { passwordsDoesNotMatch: true };
    } else {
      g.get(p2)?.setErrors(null)
    }
    return null;
  }

}
