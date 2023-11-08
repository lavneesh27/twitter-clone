import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { Tweet } from '../models/tweet.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
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

  constructor(
    private service: MainService,
    private route: Router,
    private fb: FormBuilder,
    private _location: Location,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    if(!localStorage.getItem('user') && !sessionStorage.getItem('user')){
      this.route.navigate(['login']);
      return;
    }

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
      this.route.navigate(["home"]);
      this.toastr.success('uploaded');
    })
  }
  goBack(){
    this._location.back();
  }
}
