import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Covid } from 'src/app/class/covid/covid';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private httpClient: HttpClient;

  private covidURL = 'https://covidtracking.com/api/v1/us/daily.json';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'})
  }

  constructor(handler: HttpBackend) { 
    this.httpClient = new HttpClient(handler);
  }

  getCovidData(): Observable<Covid>{
    return this.httpClient.get<Covid>(`${this.covidURL}`).pipe();
  }

}
