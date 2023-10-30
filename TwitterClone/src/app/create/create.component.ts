import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { Tweet } from '../models/tweet.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from "jwt-decode";
import { User } from '../models/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  tweet:Tweet={
    id:0,
    content:'',
    likes:0,
    userId:0
  };
  uploadForm!: FormGroup;
  user!:User;
  
  constructor(private service:MainService, private route:Router, private fb:FormBuilder) {    
  }
  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  upload(){
    this.tweet.content = this.uploadForm.get('content')?.value.toString();
    this.user = jwtDecode(localStorage['user'])
    this.tweet.userId = this.user.id;
    this.service.upload(this.tweet).subscribe((res)=>{
      console.log(res)
    })
  }
}
