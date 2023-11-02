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

  constructor(private service: MainService) {    
  }
  ngOnInit(): void {
    this.user = jwtDecode(localStorage.getItem('user')!);
  }

}
