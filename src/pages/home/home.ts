import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

 import {AuthProvider}   from '../../providers/auth/auth';
import { Observable, of } from 'rxjs';
import { PercentPipe } from '@angular/common';
import { PresenceProvider } from '../../providers/presence/presence';
import { TaskProvider } from '../../providers/task/task';
import { take, first,switchMap } from 'rxjs/operators';
import { Task, TaskStatus } from '../../app/types';
import { TodoProvider } from '../../providers/todo/todo';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  todaysTask$:any = of(null);
  successfulTask:Task[];
  progress$:Observable<any>;




  


  constructor(public navCtrl: NavController,
     public auth:AuthProvider,
    public modalCtrl: ModalController,
    public presence: PresenceProvider,
    public task: TaskProvider,
    public todo: TodoProvider
   
    ) {


      var start = new Date();
      start.setHours(0,0,0,0);
      let end = new Date(start.getTime())
      end.setHours(23,59,59,999);
  
      let a = this.auth.user$.subscribe(data=>{
        if (data && data.uid)
          {
            this.todaysTask$ = this.task.getAllTasksDuring(data.uid,start.getTime(),end.getTime() );
            this.todaysTask$.subscribe(data=>{
                this.successfulTask = [];
                data.forEach( (element:Task) => {
                    if (element.status == 2)
                      this.successfulTask.push(element);
                });
            })
            a.unsubscribe();
          }
          else{
            return;
          }
      })
  
      this.progress$ = this.task.currentTask$.pipe(switchMap( data=>{
        if (!data)
        return of('0%');
  
        if (data.status == TaskStatus.Finish){
          return of('100%');
        }
        else if (data.status == TaskStatus.Fail && data.endTask ){
          let didDuring =  data.endTask - data.startTask ;
          let prc = Math.round(   (didDuring /  (data.totalTime*60*1000)) *100);
          if (prc > 100)  prc = 100 
          return of(`${prc}%`);
        }
        
        return of('0%');
      }))
    
    
  }
  ionViewDidLoad() {
   
    
    
   
  }



  start(){
    this.modalCtrl.create('time-main',{}).present();
  }
  motivation(){
    this.navCtrl.push('motivation-setting');
  }

  openProfile(){
    this.navCtrl.push('profile',{uid:this.auth.uid});
    
  }

  openEditProfile(){
    this.navCtrl.push('edit-profile')
  }
  enterRoom(){
    if (this.auth.userdata && this.auth.userdata.roomId){
      this.navCtrl.push('room',{
        roomId:this.auth.userdata.roomId
      })
    }
  }







}
