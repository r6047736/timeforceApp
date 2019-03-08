import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Platform } from "ionic-angular";
import { TimerManagerProvider } from "../../providers/timer-manager/timer-manager";

import { LocalNotifications } from "@ionic-native/local-notifications";
import { Subscription, of } from "rxjs";

/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "timer",
  templateUrl: "timer.html"
})
export class TimerComponent {
  @Output("start") startEvent: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output("update") updateEvent: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output("finish") finishEvent: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output("pause") pauseEvent: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output("fail") failEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output("end") endEvent: EventEmitter<boolean> = new EventEmitter<boolean>();


  
  

  
   



  
  constructor(
    private tm: TimerManagerProvider,
    public platform: Platform,
    public ln: LocalNotifications
  ) {
    this.tm.startEmmiter.subscribe(data => {
      this.startEvent.emit(data);
    });
    this.tm.updateEmmiter.subscribe(data => {
      this.updateEvent.emit(data);
    });
    this.tm.pauseEmmiter.subscribe(data => {
      this.pauseEvent.emit(data);
    });
    this.tm.finishEmmiter.subscribe(data => {
      this.finishEvent.emit(data);
    });
    this.tm.failEmmiter.subscribe(data => {
      this.failEvent.emit(data);
    });
    this.tm.endEmmiter.subscribe(data=>{
      this.endEvent.emit(data);
    })
  }

  reset() {
    
  }

  startTimer() {}
}
