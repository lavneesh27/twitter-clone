import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() tweet!: Tweet;
  user?: User;
  dataURL?:string
  userURL?:string
  like: boolean = false;
  @Output() likeEvent = new EventEmitter<string>();

  constructor(private service: MainService) {}
  ngOnInit(): void {
    this.service.getUser(this.tweet.userId).subscribe((res: any) => {
      this.user = res;
      if(this.user?.image){
        // console.log(this.user.image)
        this.userURL = 'data:image/jpeg;base64,' + this.user.image;
      }
    });

    if(this.tweet.image){
      this.dataURL = 'data:image/jpeg;base64,' + this.tweet.image;
    }

    // console.log(this.like)
  }

  // plusLike(tweet: Tweet) {
  //   this.like = !this.like;
  //   if (!this.like) {
  //     this.service.likeTweet(tweet.id, false).subscribe((res) => {
  //       this.tweet.likes! += 1;
  //     });
  //   } else {
  //     this.service.likeTweet(tweet.id, true).subscribe((res) => {
  //       this.tweet.likes! -= 1;
  //     });
  //   }
  // }

  plusLike(tweet: Tweet) {
    if (this.like) {
      this.service.likeTweet(tweet.id, false).subscribe((res) => {
        this.tweet.likes!++;
      });
    } else {
      this.service.likeTweet(tweet.id, true).subscribe((res) => {
        this.tweet.likes!--;
      });
    }
    // this.likeEvent.emit(this.like ? 'like' : 'unlike'); 
  }
  copy(){
    navigator.clipboard.writeText(window.location.href);
  }
  bookmark(){
    
  }
}
