
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import {Task, TaskStatus } from '../../app/types'
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/




@Injectable()
export class DataProvider {

  tasks:Task[]=[];
  currentCircle :Task; 
  userData = {
    
  }

  constructor(
    public st: StorageProvider) {
      this.setUp();

  }
  async setUp(){
    this.tasks = await this.st.get('tasks');
    // this.updateTasks([])
    // console.log('clean')
    if (this.tasks && this.tasks.length>0 ){
      this.currentCircle = this.tasks[this.tasks.length];
      console.log('task:', this.tasks);
    }

    
   
  }

 updateTasks(tasks?){
   if (tasks)
   this.tasks = tasks;


  this.st.set('tasks',this.tasks);
  this.currentCircle = this.tasks[this.tasks.length-1];
  console.log('the recent task', this.currentCircle);

}

   startOneCircle ( title,start,end,total,relax ){

    console.log('adding new tasks in to tasks', this.tasks);

    let nTask:any = {
      title : title,
      startTask: start,
      endTask:end,
      totalTime:total,
      relaxTime:relax,
      status: TaskStatus.Runing
    } 
    if (!this.tasks)  this.tasks =[];
    this.tasks.push(nTask)
    this.updateTasks()


  }
  
  resetTheCircle(){
   
  }

  isRunning(){
    
    if (!this.currentCircle || !this.currentCircle.status)
      return false;

    return this.currentCircle.status == TaskStatus.Runing;

  }

  successCircle(){
   // console.log('current, ', this.currentCircle);
    this.currentCircle.status = TaskStatus.Finish;
    this.currentCircle.endTask  = Date.now(); 
    this.updateTasks()
  }
  
  failCircle(){
    if (this.currentCircle)
    this.currentCircle.status = TaskStatus.Fail;
    this.updateTasks()

  }




}
