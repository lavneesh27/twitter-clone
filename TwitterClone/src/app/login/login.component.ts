import { Component, OnInit } from '@angular/core';
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
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private service: MainService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'),
        ],
      ],
    });
  }

  login() {
    this.submitted = true;

    this.service.loginUser(this.Email.value, this.PWD.value).subscribe(
      (res: any) => {
        sessionStorage.setItem('user', res.toString());
        this.toastr.success('Login Successful!');
        
        setTimeout(() => {
          window.location.reload();
        }, 500);
        
        this.router.navigate(["/home"])
      },
      (err) => {
        console.log('error occured');
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
}
