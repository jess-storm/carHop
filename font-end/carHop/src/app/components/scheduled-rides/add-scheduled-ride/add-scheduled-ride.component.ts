import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { ScheduledRidesService } from 'src/app/service/scheduled-rides/scheduled-rides.service';
import { ScheduledRide } from 'src/app/class/scheduled-ride/scheduled-ride';

@Component({
  selector: 'app-add-scheduled-ride',
  templateUrl: './add-scheduled-ride.component.html',
  styleUrls: ['./add-scheduled-ride.component.css']
})
export class AddScheduledRideComponent implements OnInit {

  scheduledRides: ScheduledRide = new ScheduledRide();
  submitted = false;
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  currentUser: any;
  index: number = 0;
  show = false;

  constructor(public scheduledRidesService: ScheduledRidesService, private router: Router, 
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    let role = this.currentUser.roles[this.index++];
    if ((role == 'ROLE_DRIVER') || (role == 'ROLE_ADMIN')) {
      this.show = true;
    }
  }
  newRequestedRides(): void {
    this.submitted = false;
    this.scheduledRides = new ScheduledRide();
  }

  onSubmit(): void {
    this.submitted = true;
    const id: number = +this.currentUser.id; 
    this.scheduledRidesService.create(id, this.scheduledRides).subscribe(
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
      this.scheduledRides = new ScheduledRide();
  }
  reloadPage(): void {
    this.router.navigate(['/outgoing_trips']).then(() => {
      window.location.reload();
    });
  }
}
