import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScheduledRide } from 'src/app/class/scheduled-ride/scheduled-ride';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduledRidesService {

  private baseUrl = 'http://localhost:8080/outgoing_trips';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //get all rides
  getAll(): Observable<ScheduledRide[]> {
    console.log("errorMessage");
    return this.httpClient.get<ScheduledRide[]>(this.baseUrl).pipe(
      catchError(this.errorHandler)
    );
  }

  //get selected ride
  getById(id: number): Observable<ScheduledRide>{ 
    return this.httpClient.get<ScheduledRide>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }
    //create ride
    create(user_id, createdRide): Observable<ScheduledRide>{
      return this.httpClient.post<ScheduledRide>(`${this.baseUrl}/${user_id}/create`, createdRide, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }

  //update ride by id
  update(id, scheduledRide): Observable<ScheduledRide> {
    return this.httpClient.post<ScheduledRide>(`${this.baseUrl}/${id}/update`, scheduledRide, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //delete ride by id
  delete(id) {
    return this.httpClient.delete<ScheduledRide>(`${this.baseUrl}/${id}`, this.httpOptions)
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