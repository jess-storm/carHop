import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/class/car/car';
import { CarService } from 'src/app/service/car/car.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';
  currentUser: any;
  car: Car = new Car();

  constructor(private token: TokenStorageService, private route: ActivatedRoute, 
    private carService: CarService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onSubmit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.carService.update(id, this.car).subscribe(
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
    this.car = new Car();
  }
  reloadPage(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }
}



