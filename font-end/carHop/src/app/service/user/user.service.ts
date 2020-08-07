import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/class/user/user';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/profile';

  constructor(private httpClient: HttpClient) { } 


  //get all users
  getAll(): Observable<User[]> {
    console.log("errorMessage");
    return this.httpClient.get<User[]>(`${this.baseUrl}/findAll`).pipe(
      catchError(this.errorHandler)
    );
  } 

    //get selected user
    findById(id: number): Observable<User>{ 
      return this.httpClient.get<User>(`${this.baseUrl}/${id}`).pipe(
        catchError(this.errorHandler)
      );
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
