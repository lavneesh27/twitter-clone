import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user?: any;
  imgUrl: any;

  constructor(private router: Router) {}
  ngOnInit(): void {
    const userToken = localStorage.getItem('user') ?? sessionStorage.getItem('user');
    if (userToken) {
      this.user = jwtDecode(userToken);
      // this.imgUrl += this.user.image;
      // Assuming `this.user.image` is your Uint8Array containing image data
      const uints = new Uint8Array(this.user.image);
      const binary = uints.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      const base64 = btoa(binary);

      this.imgUrl = 'data:image/jpeg;base64,' + base64;
    }
  }
  
  // bytesToBase64(bytes: any) {
  //   const byteArray = new Uint8Array(bytes);
  //   let binary = '';
  //   for (let i = 0; i < byteArray.byteLength; i++) {
  //     binary += String.fromCharCode(byteArray[i]);
  //   }
  //   return window.btoa(binary);
  // }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  login() {
    this.router.navigate(['/login']);
  }
}
