import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from 'src/app/class/review/review'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8080/reviews';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //get all rides
  getAll(): Observable<Review[]> {
    console.log("errorMessage");
    return this.httpClient.get<Review[]>(this.baseUrl).pipe(
      catchError(this.errorHandler)
    );
  }

  //get selected ride
  getByUserId(user_id: number): Observable<Review[]>{ 
    return this.httpClient.get<Review[]>(`${this.baseUrl}/${user_id}/user`).pipe(
      catchError(this.errorHandler)
    );
  }
    //create ride
    create(user_id, createdRide): Observable<Review>{
      return this.httpClient.post<Review>(`${this.baseUrl}/${user_id}/create`, createdRide, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }

  //update ride by id
  update(id, scheduledRide): Observable<Review> {
    return this.httpClient.post<Review>(this.baseUrl + id, JSON.stringify(scheduledRide), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //delete ride by id
  delete(id) {
    return this.httpClient.delete<Review>(this.baseUrl + id, this.httpOptions)
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