import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { User } from '../models/user.model';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  user!:User;
  imgUrl:string='data:image/jpeg;base64,';

  constructor(private service: MainService) {    
  }
  ngOnInit(): void {
    this.user = jwtDecode(localStorage.getItem('user')!);
    this.imgUrl+=this.bytesToBase64(this.user.image);
    console.log(typeof this.user.image)
  }

  bytesToBase64(bytes:any) {
    const byteArray = new Uint8Array(bytes);
    let binary = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
      binary += String.fromCharCode(byteArray[i]);
    }
    return window.btoa(binary);
  }

}
