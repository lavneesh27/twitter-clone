import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private service: MainService) {   
  }
  peoples: User[]=[];
  ngOnInit(): void {
    this.service.getUsers().subscribe((res:any)=>{
      this.peoples = res;
    })
  }

}
