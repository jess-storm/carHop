import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { Car } from 'src/app/class/car/car';
import { CarService } from 'src/app/service/car/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  car: Car = new Car();
  submitted = false;
  isSuccessful = false;
  isFailed = false;
  errorMessage = ''; 
  currentUser: any;

  constructor(public carService: CarService, private router: Router, 
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  newCar(): void {
    this.submitted = false;
    this.car = new Car();
  }

  onSubmit(): void {
    this.submitted = true;
    const id: number = +this.currentUser.id; 
    this.carService.create(id, this.car).subscribe(
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
      this.car = new Car();
  }
  reloadPage(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }
}
