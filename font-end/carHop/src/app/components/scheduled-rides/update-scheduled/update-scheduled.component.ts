import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { ScheduledRide } from 'src/app/class/scheduled-ride/scheduled-ride';
import { ScheduledRidesService } from 'src/app/service/scheduled-rides/scheduled-rides.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-scheduled',
  templateUrl: './update-scheduled.component.html',
  styleUrls: ['./update-scheduled.component.css']
})
export class UpdateScheduledComponent implements OnInit {

  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';
  currentUser: any;
  scheduledRides: ScheduledRide = new ScheduledRide();

  constructor(private token: TokenStorageService, private route: ActivatedRoute, 
    private scheduledService: ScheduledRidesService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onSubmit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.scheduledService.update(id, this.scheduledRides).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    );
    this.scheduledRides = new ScheduledRide();
  }
  reloadPage(): void {
    this.router.navigate(['/outgoing_trips']).then(() => {
      window.location.reload();
    });
  }
}



