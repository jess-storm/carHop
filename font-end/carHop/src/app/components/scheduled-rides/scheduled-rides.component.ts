import { Component, OnInit } from '@angular/core';
import { ScheduledRide } from 'src/app/class/scheduled-ride/scheduled-ride';
import { ScheduledRidesService } from 'src/app/service/scheduled-rides/scheduled-rides.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-scheduled-rides',
  templateUrl: './scheduled-rides.component.html',
  styleUrls: ['./scheduled-rides.component.css']
})
export class ScheduledRidesComponent implements OnInit {

  scheduledRides: ScheduledRide[] = [];
  currentUser: any;
  index = 0;
  buttonShow = false;

  constructor(public scheduledRidesService: ScheduledRidesService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(this.currentUser) {
      let role = this.currentUser.roles[this.index++];
      if (role == 'ROLE_DRIVER' || role == 'ROLE_ADMIN') {
        this.buttonShow = true;
      }
      this.scheduledRidesService.getAll().subscribe((data: ScheduledRide[])=>{
        console.log(data);
        this.scheduledRides = data;
      })
    }
  }

}
