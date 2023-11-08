import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { MainService } from '../main.service';
import { jwtDecode } from 'jwt-decode';
import { Tweet } from '../models/tweet.model';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!:User;
  tweets!:Tweet[];

  constructor(private service: MainService, private _location: Location,private router:Router) {    
  }
  ngOnInit(): void {
    const userToken = localStorage.getItem('user') ?? sessionStorage.getItem('user');
    if (userToken) {
      this.user = jwtDecode(userToken);
    }else{
      this.router.navigate(['login']);
      return;
    }
    this.service.loadTweets().subscribe((res:any)=>{
      this.tweets = res.filter((tweet:Tweet)=>{
        return tweet.userId==this.user.id;
      })
    })
  }
  goBack(){
    this._location.back();
  }

}
