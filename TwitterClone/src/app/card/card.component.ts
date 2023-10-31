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
  @Output() likeEvent = new EventEmitter<string>();

  constructor(private service: MainService) {}
  ngOnInit(): void {
    this.service.getUser(this.tweet.userId).subscribe((res: any) => {
      this.user = res;
      console.log(this.user!.image)
    });
  }

  plusLike(tweet: Tweet) {
    this.service.likeTweet(tweet.id).subscribe((res) => {
      console.log(res);
      this.likeEvent.emit('hit like');
    });
  }

  getUser(id: number) {
    this.service.getUser(id).subscribe((res: any) => {
      this.user = res;
    });
  }
}
