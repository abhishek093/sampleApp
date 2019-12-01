import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
// import {AppSettings} from '../configuration/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class AllSetupService {
  constructor(private http: HttpClient) { }

  loginService(body){
    // return this.http.post('assets/jsons/login.json', body).pipe(
    return this.http.get('assets/jsons/login.json').pipe(
      retry(0),
      catchError(this.customError)
    );
  }
  customError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.title}`;
    } else {
      errorMessage = error.error.title;
    }
    return throwError(errorMessage);
  }
  
}
