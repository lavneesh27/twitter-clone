import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Tweet } from './models/tweet.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseUrl = 'https://localhost:7247/api/';

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    let url = this.baseUrl + 'User/RegisterUser';

    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseUrl + 'User/LoginUser';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  loadTweets() {
    let url = this.baseUrl + 'Tweet/GetTweets';
    return this.http.get(url);
  }

  likeTweet(id: number, isLiked:boolean) {
    let url = this.baseUrl + 'Tweet/LikeTweet/' + id +'/'+ isLiked;
    return this.http.post(url,null , { responseType: 'text'});
  }

  getUser(id: number) {
    let url = this.baseUrl + 'User/GetUser/' + id;
    return this.http.get(url);
  }
  getUsers() {
    let url = this.baseUrl + 'User/GetUsers';
    return this.http.get(url);
  }

  upload(tweet: Tweet) {
    let url = this.baseUrl + 'Tweet/UploadTweet';
    return this.http.post(url, tweet, { responseType: 'text' });
  }
}
