import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  username: string;
  index: number = 0;
  currentUser: any;
  isAdmin = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.currentUser = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      let role = this.currentUser.roles[this.index++];
      if (role == 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}


