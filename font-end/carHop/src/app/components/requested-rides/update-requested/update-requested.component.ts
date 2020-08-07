import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { RequestedRide } from 'src/app/class/requested-ride/requested-ride';
import { RequestedRidesService } from 'src/app/service/requested-rides/requested-rides.service';

@Component({
  selector: 'app-update-requested',
  templateUrl: './update-requested.component.html',
  styleUrls: ['./update-requested.component.css']
})
export class UpdateRequestedComponent implements OnInit {

  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';
  currentUser: any;
  requestedRides: RequestedRide = new RequestedRide();

  constructor(private token: TokenStorageService, private route: ActivatedRoute, 
    private requestedService: RequestedRidesService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onSubmit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.requestedService.update(id, this.requestedRides).subscribe(
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
    this.requestedRides = new RequestedRide();
  }
  reloadPage(): void {
    this.router.navigate(['/requested_trips']).then(() => {
      window.location.reload();
    });
  }
}




