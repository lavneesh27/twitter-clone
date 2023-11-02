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
  like: boolean = false;
  @Output() likeEvent = new EventEmitter<string>();

  constructor(private service: MainService) {}
  ngOnInit(): void {
    this.service.getUser(this.tweet.userId).subscribe((res: any) => {
      this.user = res;
    });

    console.log(this.like)
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
  getUser(id: number) {
    this.service.getUser(id).subscribe((res: any) => {
      this.user = res;
    });
  }
  copy(){
    navigator.clipboard.writeText(window.location.href);
  }
  bookmark(){
    
  }
}
