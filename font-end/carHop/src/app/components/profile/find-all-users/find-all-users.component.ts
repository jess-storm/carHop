import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/class/user/user';

@Component({
  selector: 'app-find-all-users',
  templateUrl: './find-all-users.component.html',
  styleUrls: ['./find-all-users.component.css']
})
export class FindAllUsersComponent implements OnInit {

  user: User[] = [];
  currentUser: any;
  index: number= 0;
  canView = false;

  constructor(private token: TokenStorageService, public userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getAll().subscribe((data: User[])=>{
      console.log(data);
      this.user = data;
      let role = this.currentUser.roles[this.index++];
      if (role == 'ROLE_ADMIN') {
        this.canView = true;
      }
    })
  }

}