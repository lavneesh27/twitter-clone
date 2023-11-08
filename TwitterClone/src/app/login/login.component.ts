import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MainService } from '../main.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  remember: boolean = false;
  constructor(
    private fb: FormBuilder,
    private service: MainService,
    private toastr: ToastrService,
    private router: Router,
    private _location: Location
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]],
      rem: [false],
    });
  }

  login() {
    this.service.loginUser(this.Email.value, this.PWD.value).subscribe(
      (res: any) => {
        this.remember
          ? localStorage.setItem('user', res.toString())
          : sessionStorage.setItem('user', res.toString());

        setTimeout(() => {
          window.location.reload();
        }, 500);
        this.router.navigate(['home']);
        this.toastr.success('Login Successful!');
      },
      () => {
        this.toastr.warning('Invalid Credentials');
      }
    );
  }
  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

  goBack() {
    this._location.back();
  }
}
