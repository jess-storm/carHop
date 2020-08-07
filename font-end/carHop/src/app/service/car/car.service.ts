import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from 'src/app/class/car/car'

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl = 'http://localhost:8080/car';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //get all cars
  getAll(): Observable<Car[]> {
    console.log("errorMessage");
    return this.httpClient.get<Car[]>(`${this.baseUrl}`).pipe(
      catchError(this.errorHandler)
    );
  } 

  //get selected car
  getById(id: number): Observable<Car>{ 
    return this.httpClient.get<Car>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  //create car
  create(user_id, createdCar): Observable<Car>{
    return this.httpClient.post<Car>(`${this.baseUrl}/${user_id}/create`, createdCar, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //update car by id
  update(id, car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.baseUrl}/${id}/update`, car, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //delete ride by id
  delete(id) {
    return this.httpClient.delete<Car>(`${this.baseUrl}/${id}`, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}