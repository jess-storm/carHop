import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import {  Router } from '@angular/router';
import { User } from 'src/app/class/user/user';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  isDriver = false;
  needsCar = false;
  index = 0;
  user: User;

  constructor(private token: TokenStorageService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.findId(); 
  }

  editUser() {
    this.currentUser = this.token.getUser();
    this.router.navigate(['/edit', this.currentUser.id]);
  }

  findId() {
    if(this.currentUser) {
      const id = this.currentUser.id;
      console.log(id);
  
      this.userService.findById(id).subscribe((data: User)=>{
        console.log(data);
        this.user = data;
        let role = this.currentUser.roles[this.index++];
        if (role == 'ROLE_DRIVER' && this.user.car) {
          this.isDriver = true;
        }
        if((role == 'ROLE_DRIVER') && (this.user.car == null)) {
          this.needsCar = true;
        }
      })
    }
  }
}
