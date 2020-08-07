import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestedRidesService } from 'src/app/service/requested-rides/requested-rides.service';
import { RequestedRide } from 'src/app/class/requested-ride/requested-ride';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {

  requestedRides: RequestedRide = new RequestedRide();
  submitted = false;
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  currentUser: any;
  
  constructor(public requestedRidesService: RequestedRidesService, private router: Router, 
    private token: TokenStorageService) { }


  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  newRequestedRides(): void {
    this.submitted = false;
    this.requestedRides = new RequestedRide();
  }

  onSubmit(): void {
    this.submitted = true;
    const id: number = +this.currentUser.id; 
    this.requestedRidesService.create(id, this.requestedRides).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
        this.reloadPage
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      });
      this.requestedRides = new RequestedRide();
  }
  reloadPage(): void {
    this.router.navigate(['/requested_trips']).then(() => {
      window.location.reload();
    });
  }
}
