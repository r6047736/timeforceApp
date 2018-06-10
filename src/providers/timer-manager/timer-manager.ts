import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
/*
  Generated class for the TimerManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimerManagerProvider {

  private StoperEmmiter = new BehaviorSubject<boolean>(false);
  timerAbort = this.StoperEmmiter.asObservable();

  constructor() {
    console.log('Hello TimerManagerProvider Provider');
  }

  setTimerAbort(bol:boolean){
    this.StoperEmmiter.next(bol);
  }
  

}
