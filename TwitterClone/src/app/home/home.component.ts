import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Tweet } from '../models/tweet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  tweets:Tweet[]=[];
  userNames:string[]=[];
  constructor(private service:MainService) {
  }
  ngOnInit(): void {
    this.service.loadTweets().subscribe((res:any)=>{
      this.tweets = res;
      this.tweets.reverse();
    })
  }
}
