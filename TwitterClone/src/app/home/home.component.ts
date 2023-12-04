import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Tweet } from '../models/tweet.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnDestroy {
  tweets: Tweet[] = [];
  imgUrl: any;
  dataURL: string = '';
  isLoading:boolean=false;
  tweet: Tweet = {
    id: 0,
    content: '',
    likes: 0,
    userId: 0,
    createdAt: '',
    image: [],
  };
  uploadForm!: FormGroup;
  user: any;
  gifs:any[]=[];
  subscription:any;
  constructor(
    private service: MainService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    if (!localStorage.getItem('user') && !sessionStorage.getItem('user')) {
      this.router.navigate(['login']);
      return;
    }
    const userToken = localStorage.getItem('user') ?? sessionStorage.getItem('user');
    if (userToken) {
      this.user = jwtDecode(userToken);
    }
    this.isLoading=true;
    this.service.loadTweets().subscribe((res: any) => {
      this.isLoading=false;
      this.tweets = res;
      this.tweets.reverse();
    });
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
    let image:Uint8Array | null;
    reader.onload = () => {
      const base64 = reader.result as string;
      image = this.base64ToBytes(base64);
      this.tweet.image = Array.from(image);
    };
    reader.readAsDataURL(file);

    setTimeout(() => {
      if (image) {
        const base64String = btoa(
          String.fromCharCode.apply(null, Array.from(image))
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
    
    this.tweet.userId = this.user.id;
    this.service.upload(this.tweet).subscribe(() => {
      this.toastr.success('uploaded');
      this.dataURL = '';
      this.imgUrl=''
      this.tweet.image=[];
      this.ngOnInit();
    });
  }
  clearImage() {
    this.dataURL = '';
  }
  
  onImport(vitalSignsDataModal: any) {
    this.modalService.dismissAll();
    this.modalService.open(vitalSignsDataModal, { size: 'lg', centered: true });
    this.service.getTrendingGifs();
    this.subscription = this.service.getGifs().subscribe((res)=>{
      this.gifs=res;
    })
  }
  searchGif(searchTerm:any){
    if(searchTerm!==""){
      this.service.searchGifs(searchTerm);
      this.subscription = this.service.getGifs().subscribe((res)=>{
        this.gifs=res;
      })
    }
  }
  selectGif(gif:any){
    console.log(gif);

    this.service.getGifByteArray(gif.images.fixed_width_small.url).subscribe((res)=>{

      this.tweet.image=res;
      this.modalService.dismissAll();
      setTimeout(() => {
        if (res) {
          const base64String = btoa(
            String.fromCharCode.apply(null, Array.from(res))
            );
            this.dataURL = 'data:image/jpeg;base64,' + base64String;
          }
        }, 600);
      })
      console.log(this.uploadForm.get('image'));
  }
}
