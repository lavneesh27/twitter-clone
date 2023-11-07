import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Tweet } from '../models/tweet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  tweets:Tweet[]=[];
  constructor(private service:MainService, private router: Router) {
  }
  ngOnInit(): void {
    if(!localStorage.getItem('user') && !sessionStorage.getItem('user')){
      this.router.navigate(['login']);
      return;
    }
    this.service.loadTweets().subscribe((res:any)=>{
      this.tweets = res;
      this.tweets.reverse();
    })
  }
}
