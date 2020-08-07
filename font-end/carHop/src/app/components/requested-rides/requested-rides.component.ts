import { Component, OnInit } from '@angular/core';
import { RequestedRidesService } from 'src/app/service/requested-rides/requested-rides.service';
import { RequestedRide } from 'src/app/class/requested-ride/requested-ride';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-requested-rides',
  templateUrl: './requested-rides.component.html',
  styleUrls: ['./requested-rides.component.css']
})
export class RequestedRidesComponent implements OnInit {

requestedRides: RequestedRide[] = [];
currentUser: any; 

  constructor(public requestedRidesService: RequestedRidesService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.requestedRidesService.getAll().subscribe((data: RequestedRide[])=>{
      console.log(data);
      this.requestedRides = data;
    })
  }

}