import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { User } from '../models/user.model';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private service: MainService) {   
  }
  peoples: User[]=[];
  inputUser: string = '';
  user:any;
  ngOnInit(): void {
    this.user = jwtDecode(sessionStorage.getItem('user')!)
    if(!sessionStorage.getItem('user')) return;
    this.service.getUsers().subscribe((res:any)=>{
      this.peoples = res.filter((people:any)=>{
        return people.userName!=this.user.userName;
      });
      console.log(this.peoples[0].image)
    })
  }

  filter(searchText:string){
    console.log(searchText)
    this.service.getUsers().subscribe((res:any)=>{
      this.peoples = res.filter((user:User)=>{
        return user.firstName.toLowerCase().includes(searchText.toLowerCase());
      })
    })
  }



}
