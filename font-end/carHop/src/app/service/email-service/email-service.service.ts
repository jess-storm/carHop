import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators';
import { Email } from 'src/app/class/email/email';

@Injectable({
  providedIn: 'root'
})

export class EmailServiceService {

  private baseUrl = 'http://localhost:8080/send-mail';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

    //create email
    create(email): Observable<Email>{
      return this.httpClient.post<Email>(`${this.baseUrl}`, email)
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
