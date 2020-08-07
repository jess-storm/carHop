import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/service/car/car.service'
import { Car } from 'src/app/class/car/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  currentUser: any;
  car: Car;
  index: number = 0;
  buttonShow = false;
  constructor(private carService: CarService, private token: TokenStorageService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    this.listCar();
  }

  listCar() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.carService.getById(id).subscribe((data: Car)=> {
        this.car = data;
        console.log(this.car);
        let role = this.currentUser.roles[this.index++];
        if (this.car.username == this.currentUser.username || role == 'ROLE_ADMIN') {
          this.buttonShow = true;
        }
      })
  }

}
