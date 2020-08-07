import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/class/user/user';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-all-users-profile',
  templateUrl: './all-users-profile.component.html',
  styleUrls: ['./all-users-profile.component.css']
})
export class AllUsersProfileComponent implements OnInit {

  user: User;
  currentUser: any;

  constructor(private token: TokenStorageService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.route.paramMap.subscribe(() => {
      this.listUser();
    }) 
  }

  listUser() {
        // get the "id" param string. convert string to a number using the "+" symbol
        const id: number = +this.route.snapshot.paramMap.get('id');
        this.userService.findById(id).subscribe((data: User)=> {
            this.user = data;
          })
  }

} 