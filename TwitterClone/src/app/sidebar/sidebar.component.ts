import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private service: MainService,private router:Router) {}
  peoples: User[] = [];
  inputUser: string = '';
  user: any;
  ngOnInit(): void {
    const userToken =
      localStorage.getItem('user') ?? sessionStorage.getItem('user');

    if (userToken) {
      this.user = jwtDecode(userToken);

      if (this.user.id) {
        this.service.getUsers().subscribe((res: any) => {
          this.peoples = res.filter(
            (people: any) => people.userName !== this.user.userName
          );
        });
        
      }
    }
  }

  filter(searchText: string) {
    this.service.getUsers().subscribe((res: any) => {
      this.peoples = res.filter((user: User) => {
        return user.firstName.toLowerCase().includes(searchText.toLowerCase()) && user.userName !== this.user.userName;
      });
    });
  }
  NavigateToProfile(data:any){
    this.router.navigateByUrl('/profile', {state:{'people':data}});
  }
}
  