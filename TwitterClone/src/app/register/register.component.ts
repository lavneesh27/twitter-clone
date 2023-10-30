import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder, private service: MainService, private route:Router) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*')],
        ],
        lastName: [
          '',
          [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*')],
        ],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        userName: ['', [Validators.required, Validators.minLength(2)]],
        password: [
          '',[
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]
        ],
        rPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const repeatPasswordControl = formGroup.get('rPassword');

    if (passwordControl?.value !== repeatPasswordControl?.value) {
      repeatPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      repeatPasswordControl?.setErrors(null);
    }
  }

  register() {
    this.submitted=true;
   
      let user: User = {
        id: 0,
        firstName: this.FirstName.value,
        lastName: this.LastName.value,
        email: this.Email.value,
        password: this.Password.value,
        dob: this.DOB.value,
        userName: this.UserName.value
      };
      this.service.registerUser(user).subscribe((res: any) => {
        console.log('Registration Successful!' + res);
      });
    
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get DOB(): FormControl {
    return this.registerForm.get('dob') as FormControl;
  }
  get UserName(): FormControl {
    return this.registerForm.get('userName') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RPassword(): FormControl {
    return this.registerForm.get('rPassword') as FormControl;
  }
}
