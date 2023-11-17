import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { MainService } from '../main.service';
import { jwtDecode } from 'jwt-decode';
import { Tweet } from '../models/tweet.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user!: User;
  tweets!: Tweet[];
  updateForm!: FormGroup;

  constructor(
    private service: MainService,
    private _location: Location,
    private router: Router,
    private fb: FormBuilder,
    private toast:ToastrService
  ) {}
  ngOnInit(): void {
    const userToken =
      localStorage.getItem('user') ?? sessionStorage.getItem('user');
    if (userToken) {
      this.user = jwtDecode(userToken);
    } else {
      this.router.navigate(['login']);
      return;
    }

    this.updateForm = this.fb.group({
      firstName: [
        this.user.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      lastName: [
        this.user.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      email: [this.user.email, [Validators.required, Validators.email]],
      dob: [this.user.dob],
      userName: [this.user.userName, [Validators.required, Validators.minLength(2)]],
      // image: [this.user.image],
    });

    this.service.loadTweets().subscribe((res: any) => {
      this.tweets = res.filter((tweet: Tweet) => {
        return tweet.userId == this.user.id;
      });
    });
  }
  goBack() {
    this._location.back();
  }
  update(){
    console.log("clicked")

    this.user.firstName=this.updateForm.get('firstName')?.value; 
    this.user.lastName=this.updateForm.get('lastName')?.value; 
    this.user.dob=this.updateForm.get('dob')?.value; 
    this.user.userName=this.updateForm.get('userName')?.value; 
    this.user.email=this.updateForm.get('email')?.value; 
    this.service.updateUser(this.user, this.user.id).subscribe((res)=>{
      this.toast.success("Profile Updated");
    },(err)=>{
      this.toast.error("Some error occured");
    })
  }
}
