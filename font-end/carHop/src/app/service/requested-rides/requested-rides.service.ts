import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestedRide } from 'src/app/class/requested-ride/requested-ride';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RequestedRidesService {

  private baseUrl = 'http://localhost:8080/requested_trips';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //get all rides
  getAll(): Observable<RequestedRide[]> {
    console.log("errorMessage");
    return this.httpClient.get<RequestedRide[]>(`${this.baseUrl}`).pipe(
      catchError(this.errorHandler)
    );
  } 

  //get selected ride
  getById(id: number): Observable<RequestedRide>{ 
    return this.httpClient.get<RequestedRide>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  //create ride
  create(user_id, createdRide): Observable<RequestedRide>{
    return this.httpClient.post<RequestedRide>(`${this.baseUrl}/${user_id}/create`, createdRide, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //update ride by id
  update(id, requestedRide): Observable<RequestedRide> {
    return this.httpClient.post<RequestedRide>(`${this.baseUrl}/${id}/update`, requestedRide, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //delete ride by id
  delete(id) {
    return this.httpClient.delete<RequestedRide>(`${this.baseUrl}/${id}`, this.httpOptions)
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