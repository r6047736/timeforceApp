
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Task, TaskStatus} from '../../app/types'
import * as firebase from "firebase/app";
import { AuthProvider } from '../auth/auth';
import { throwError, Observable, of } from 'rxjs';
import { first, take,switchMap } from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class TaskProvider {


  currentTask:Task;

  currentTask$:Observable<any> ;


  constructor(public afs : AngularFirestore,
    private auth: AuthProvider,
    private alertCtrl: AlertController
    ) {


      this.currentTask$ = this.auth.user$.pipe().switchMap(data=>{
      if (data && data.uid){
        return  this.getTask( data.currentTaskId);
      }
      else {
        return of(null);
      }
    })

    this.currentTask$.subscribe(data=>{
      this.currentTask = data;
    })

   

  }





  createATask(TaskName,hardCoreMode,duration,relax,location,room,titlePublic=true,memo="" ){
      var id = this.afs.createId();
      var newTask :Task = {
          id: id,
          title: TaskName,
          titlePublic: titlePublic || true,
          startTask: null,
          endTask:null,
          totalTime: parseInt(duration)  ,
          relaxTime:parseInt(relax),
          status:TaskStatus.Idle,
          uid:this.auth.uid ,
          room: room || null,
          location: location || null,
          memo:memo,
          createAt: Date.now(),
          hardcore:true,
          type:'tomato'
      }
      this.currentTask = newTask;
      console.log('current task = ', this.currentTask);
      return newTask; 
     

      //return this.afs.doc(`events/${id}`).set(newTask);
  }
  
   beforeStartNextTask() {
     // checkCurrenTask is Done if is done , delete currenTask id and return true
    // checkCurrenTask is Done if is not done , prompt and if confirm than  delete currenTask id and return true
  }



  

  linkToRoom(task, roomId){
    //task.room = roomId;
    return this.afs.doc(`events/${task.id}`).set({
      room:roomId
    },{merge:true});
  }

  updateStatus(task, startTask: TaskStatus){
    return this.afs.doc(`events/${task.id}`).set({
      status:startTask
    },{merge:true});
  }

  changeTaskName(task,name){
    return this.afs.doc(`events/${task.id}`).set({
      title:name
    },{merge:true});

  }



 createRepeatTask(){
   const id = this.afs.createId();

   this.currentTask
   let a =  {
    id: id,
    title:  this.currentTask.title,
    titlePublic: this.currentTask.titlePublic,
    startTask: null,
    endTask:null,
    totalTime: this.currentTask.totalTime ,
    relaxTime:this.currentTask.relaxTime,
    status:TaskStatus.Idle,
    uid:this.auth.uid ,
    room: this.currentTask.room,
    location: this.currentTask.location ,
    memo:this.currentTask.location,
    createAt: Date.now(),
    hardcore:true,
    type:'tomato'
   }
   this.currentTask = a;


  }

  // 开始任务前检查是否上个任务完成， 完成的话更换掉uid.currentTask
  async startTask(){
    if (!this.auth.uid)
    throw "no user ID"

    await this.beforeStartNextTask();

    
    if (!this.currentTask){
      throw "current task cannot be null"
    }
    else if (this.currentTask.status == TaskStatus.Finish)
    {
      console.log('creating repeat task')
      this.createRepeatTask();
    }
    if ( this.auth.userdata.roomId ){
      this.currentTask.room = this.auth.userdata.roomId;
    }

    let task = this.currentTask;

    this.currentTask.status = TaskStatus.Runing,
    this.currentTask.startTask = Date.now()

    return this.afs.doc(`events/${task.id}`).set( this.currentTask,{merge:true}).then(_=>{
      // console.log('finish add to event db')
      
      return this.afs.doc(`users/${this.auth.uid}/events/${task.id}`).set({
        taskId: task.id,
        createAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(_=>{
        // console.log('finish add to user db')
       
        return this.afs.doc(`users/${this.auth.uid}`).set({currentTaskId:task.id},{merge:true});
      }).then(_=>{
        // console.log('finish change user current task')
        // console.log('add to room history')
        if (task.room) {
          return  this.afs.doc(`rooms/${task.room}/history/${task.id}`).set({
             taskId:task.id,
             user: task.uid,
             userAvatar: this.auth.userdata.photoURL,
             createTime: firebase.firestore.FieldValue.serverTimestamp()
           },{merge:true})
         }

      });
    });
  }

  async finish(task:Task){
    this.currentTask.status = TaskStatus.Finish;
    await  this.afs.doc(`events/${task.id}`).set({
      status:TaskStatus.Finish,
      endTask: Date.now()
    },{merge:true});


   
  //  return (await this.afs.doc(`users/${this.auth.uid}`).set({currentTask:firebase.firestore.FieldValue.delete()})    ) 
  
  }
  async fail(taskId){
    this.currentTask.status = TaskStatus.Fail;
    await this.afs.doc(`events/${taskId}`).set({
      status:TaskStatus.Fail,
      endTask: Date.now()
    },{merge:true});


  //  return (await this.afs.doc(`users/${this.auth.uid}`).set({currentTask:firebase.firestore.FieldValue.delete()})    ) 
  
  }


  getAllTasksFromUID(uid){
    if (uid)
    return this.afs.collection(`events`,ref=>ref.where('uid',"==",uid).orderBy('startTask','desc') ).valueChanges()
    return null;
  }




  getAllHardCoreTasksFromUID(uid){
    if (uid)
    return this.afs.collection(`events`,ref=>ref.where('hardcore','==',true ).where('uid',"==",uid) ).valueChanges()
    }


  getAllTasksDuring(uid,start,end){
    if (uid)
    return this.afs.collection(`events`,ref=>
    ref.where('uid',"==",uid).
    where('startTask',">=",start).
    where('startTask',"<=",end)).valueChanges()
  }



  getTask(eventId){
    return this.afs.doc(`events/${eventId}`).valueChanges();
  }


  getCurrentTaskId(uid){
       this.afs.doc(`users/${this.auth.uid}`)

  }



  // Only can use 当用户进入应用时查找他的第一个事件

  checkTaskIsFail(taskId){

    // 检查如果 这个event list 没有task 或者 task 没有起始时间
     
    this.afs.doc(`events/${taskId}`).get().subscribe( (data)=>{

        let task:Task = data.data() as Task;
        if ( !task ||  !task.startTask ) {
          
           return this.afs.doc(`users/${this.auth.uid}`).set({
              currentTaskId: firebase.firestore.FieldValue.delete()
            },{merge:true})
        }

        if (task.status == TaskStatus.Fail) return;
        if ( Date.now()  > (task.startTask + (1 + task.totalTime)* 60 *1000)  ){
          this.fail(taskId);
        }

    })

  }
 

}


