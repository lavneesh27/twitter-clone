import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() tweet!: Tweet;

  @Output() likeEvent = new EventEmitter<string>();

  constructor(private service: MainService) {}

  plusLike(tweet: Tweet) {
    this.service.likeTweet(tweet.id).subscribe((res) => {
      console.log(res);
      this.likeEvent.emit('hit like');
    });
  }

  getUser(id: number) {
    this.service.getUser(id).subscribe((res: any) => {
      console.log(res);
    });
  }
}
