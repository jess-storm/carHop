import { Component, OnInit } from '@angular/core';
import { Covid } from 'src/app/class/covid/covid';
import { CovidService } from 'src/app/service/covid/covid.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {

  covid: Covid;

  constructor(private covidService: CovidService) { }

  ngOnInit(): void {
    this.covidService.getCovidData().subscribe((data: Covid)=>{
      this.covid = data;
    })
    console.log(this.covid);
  }

} 
