import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Tweet } from './models/tweet.model';
import { Bookmark } from './models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseUrl = 'https://localhost:7247/api/';
  userToken = localStorage.getItem('user') ?? sessionStorage.getItem('user');
  headers = new HttpHeaders({
    // 'Content-Type': 'text/plain',
    'Authorization': `Bearer ${this.userToken}`
  });

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
    return this.http.get(url,{headers:this.headers});
  }

  likeTweet(id: number, isLiked: boolean) {
    let url = this.baseUrl + 'Tweet/LikeTweet/' + id + '/' + isLiked;
    return this.http.post(url, null, { responseType: 'text', headers:this.headers });
  }

  getUser(id: number) {
    let url = this.baseUrl + 'User/GetUser/' + id;
    return this.http.get(url);
  }
  getTweet(id: number) {
    let url = this.baseUrl + 'Tweet/GetTweet/' + id;
    return this.http.get(url,{headers:this.headers});
  }
  getUsers() {
    let url = this.baseUrl + 'User/GetUsers';
    return this.http.get(url, {headers:this.headers});
  }

  upload(tweet: Tweet) {
    let url = this.baseUrl + 'Tweet/UploadTweet';
    return this.http.post(url, tweet, { responseType: 'text',headers:this.headers });
  }

  addBookmark(bookmark: Bookmark) {
    let url = this.baseUrl + 'Bookmarks/AddBookmark';
    return this.http.post(url, bookmark, { responseType: 'text',headers:this.headers });
  }

  getBookmarks(id: number) {
    let url = this.baseUrl + 'Bookmarks/GetBookmark/' + id;
    return this.http.get(url, {headers:this.headers});
  }
}
