import { Component, OnInit } from '@angular/core';
import { Tweet } from '../models/tweet.model';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';
import {Location} from '@angular/common';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  tweets: Tweet[] = [];
  user!: User;
  constructor(private service: MainService, private router: Router, private _location: Location) {}
  ngOnInit(): void {
    this.user = jwtDecode(sessionStorage.getItem('user')!);
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['login']);
    }
    this.service.getBookmarks(this.user.id).subscribe((res: any) => {
      res.forEach((element: any) => {
        this.service.getTweet(element.tweetId).subscribe((r: any) => {
          this.tweets.push(r);
        });
      });
    });
  }
  goBack(){
    this._location.back();
  }
}
