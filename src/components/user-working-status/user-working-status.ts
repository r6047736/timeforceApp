import { Component, Input } from '@angular/core';
import { PresenceProvider } from '../../providers/presence/presence';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { TaskProvider } from '../../providers/task/task';
import { RoomProvider } from '../../providers/room/room';
import { AuthProvider } from '../../providers/auth/auth';

import {Task, TaskStatus} from '../../app/types'
import { TimerManagerProvider } from '../../providers/timer-manager/timer-manager';

/**
 * Generated class for the UserWorkingStatusComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-working-status',
  templateUrl: 'user-working-status.html'
})
export class UserWorkingStatusComponent {
  
  @Input() uid;
  @Input() getTask;

  presence$:any;
  data$:any;

  task$:Observable<any>;
  taskData:Task;
  subscriptionTask:Subscription;

  timer:any;

  timeStr:string;
  precentageVal:string;



  constructor(public  presencePrivider :PresenceProvider,
    public task: TaskProvider,
    public room: RoomProvider,
    public auth:AuthProvider,
    public tm: TimerManagerProvider) {
  
    
  }

  ngOnInit(){

    this.presence$ = this.presencePrivider.getPresence(this.uid);
    this.data$ = this.presencePrivider.getUserData(this.uid)

    this. task$ = this.presencePrivider.getUserData(this.uid).pipe(switchMap( (data:any)=>{
    
      if (data.currentTaskId)
       return this.task.getTask(data.currentTaskId)
      else{
       return of(null);
      }
    }))

    this.subscriptionTask = this.task$.subscribe( (data:Task)=>{
   
      if (!data){
        return;
      }

      this.taskData = data;
      this.resetStatus(data.status);

    })
  

}
ngOnDestroy(){
  this.subscriptionTask.unsubscribe()
  clearInterval(this.timer);

}



exit(){
  this.room.leaveRoom(this.auth.uid);
}

resetStatus(status: TaskStatus){
  if (status == TaskStatus.Runing){
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(()=>{
      this.update()
    },1000)
  }
  else if ( status == TaskStatus.Finish){
      if (this.timer) clearInterval(this.timer);
      this.timeStr = "完成"
      this.precentageVal ="100%";
  }
  else if (status == TaskStatus.Fail){
    if (this.timer) clearInterval(this.timer);
    this.timeStr = "失败"
    this.precentageVal ="100%";
  }
    
}

update(){
  if (this.taskData){
    let s = (Date.now() - this.taskData.startTask)/1000;
    let p =   Math.round (( s / (this.taskData.totalTime *60)  ) * 100);
    if (p > 100 )  p = 100;
    if (p <0) p=0;
    this.precentageVal = String (p) + "%"
    this.timeStr = this.tm.counterTotimer( Math.round(s));


  }

}





}
