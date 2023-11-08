import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Tweet } from '../models/tweet.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  tweets:Tweet[]=[];
  imgUrl: any;
  image: Uint8Array | null = null;
  dataURL: string = '';
  tweet: Tweet = {
    id: 0,
    content: '',
    likes: 0,
    userId: 0,
    createdAt: '',
    image: []
  };
  uploadForm!: FormGroup;
  user!: User;
  constructor(private service:MainService, private router: Router,private fb: FormBuilder,private toastr: ToastrService) {
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
    this.uploadForm = this.fb.group({
      content: ['', [Validators.required]],
      image: [''],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Please select only image files.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.image = this.base64ToBytes(base64);
      this.tweet.image = Array.from(this.image);
    };
    reader.readAsDataURL(file);
    
    setTimeout(() => {
      if (this.image) {
        const base64String = btoa(
          String.fromCharCode.apply(null, Array.from(this.image))
        );
        this.dataURL = 'data:image/jpeg;base64,' + base64String;
      }
    }, 300);
    
  }
  base64ToBytes(base64: string): Uint8Array {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }

  upload() {
    this.tweet.content = this.uploadForm.get('content')?.value.toString();
    this.user = jwtDecode(sessionStorage['user'])
    this.tweet.userId = this.user.id;
    this.service.upload(this.tweet).subscribe((res)=>{
      this.toastr.success('uploaded');
      this.image=null;
      this.dataURL='';
      this.ngOnInit();
    })
  }
}
