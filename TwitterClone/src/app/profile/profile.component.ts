import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { MainService } from '../main.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!:User;

  constructor(private service: MainService) {    
  }
  ngOnInit(): void {
    this.user = jwtDecode(sessionStorage.getItem('user')!);
  }

}
