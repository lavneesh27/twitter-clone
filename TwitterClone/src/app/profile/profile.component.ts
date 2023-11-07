import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { MainService } from '../main.service';
import { jwtDecode } from 'jwt-decode';
import { Tweet } from '../models/tweet.model';
import {Location} from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!:User;
  tweets!:Tweet[];

  constructor(private service: MainService, private _location: Location) {    
  }
  ngOnInit(): void {
    this.user = jwtDecode(sessionStorage.getItem('user')!);
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
