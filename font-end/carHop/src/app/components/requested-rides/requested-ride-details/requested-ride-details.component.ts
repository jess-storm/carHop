import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestedRidesService } from 'src/app/service/requested-rides/requested-rides.service';
import { RequestedRide } from 'src/app/class/requested-ride/requested-ride';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-requested-ride-details',
  templateUrl: './requested-ride-details.component.html',
  styleUrls: ['./requested-ride-details.component.css']
})
export class RequestedRideDetailsComponent implements OnInit {

  currentUser: any;
  requestedRide: RequestedRide;
  index: number = 0;
  buttonShow = false;
  constructor(private rrService: RequestedRidesService, private route: ActivatedRoute, 
    private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.route.paramMap.subscribe(() => {
      this.listRide();
    }) 
  }
  listRide() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.rrService.getById(id).subscribe((data: RequestedRide)=> {
        this.requestedRide = data;
        let role = this.currentUser.roles[this.index++];
        if (this.requestedRide.user.id == this.currentUser.id || role == 'ROLE_ADMIN') {
          this.buttonShow = true;
        }
      })
  }
  public delete() {
    const id2: number = +this.route.snapshot.paramMap.get('id');
    if (confirm("Are you sure you would like to delete?")) {
      this.rrService.delete(id2).subscribe(response=> {
        this.router.navigate(['/requested_trips'])})
    } else {
        window.location.reload();
    }
  }

} 
