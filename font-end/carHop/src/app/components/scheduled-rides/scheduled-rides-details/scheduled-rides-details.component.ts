import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduledRidesService } from 'src/app/service/scheduled-rides/scheduled-rides.service';
import { ScheduledRide } from 'src/app/class/scheduled-ride/scheduled-ride';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-scheduled-rides-details',
  templateUrl: './scheduled-rides-details.component.html',
  styleUrls: ['./scheduled-rides-details.component.css']
})
export class ScheduledRidesDetailsComponent implements OnInit {

  currentUser: any;
  scheduledRide: ScheduledRide;
  index: number = 0;
  buttonShow = false;

  constructor(private srService: ScheduledRidesService, private route: ActivatedRoute, 
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
    this.srService.getById(id).subscribe((data: ScheduledRide)=> {
        this.scheduledRide = data;
        let role = this.currentUser.roles[this.index++];
        if (this.scheduledRide.user.id == this.currentUser.id || role == 'ROLE_ADMIN') {
          this.buttonShow = true;
        }
      })
  }
  public delete() {
    const id2: number = +this.route.snapshot.paramMap.get('id');
    if (confirm("Are you sure you would like to delete?")) {
      this.srService.delete(id2).subscribe(response=> {
        this.router.navigate(['/outgoing_trips'])})
    } else {
        window.location.reload();
    }
  }

} 
