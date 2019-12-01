import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public loginSessionData = new BehaviorSubject<any>(null);
  constructor() { }

  setSessionData(value){
    this.loginSessionData.next(value);
  }
  getSessionData(): Observable<any> {
    return this.loginSessionData;
  } 
}
