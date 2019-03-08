import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { TaskProvider } from '../../../providers/task/task';
import { TimerManagerProvider } from '../../../providers/timer-manager/timer-manager';
import { TaskStatus } from '../../../app/types';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the TimerRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(

  {
    name:'timer-room',
    segment: 'timer-room/:roomId',
    defaultHistory: ['community']
  }
  
)
@Component({
  selector: 'page-timer-room',
  templateUrl: 'timer-room.html',
})
export class TimerRoomPage {


  currentTime:string;
  users:any=[];
  roomId:string


  stage: TaskStatus= TaskStatus.Idle;; 



  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public view: ViewController,
     private modal: ModalController,
     public task: TaskProvider,
     public tm : TimerManagerProvider,
     public alert: AlertController,
     public ln: LocalNotifications) {
    this.users = this.navParams.get('users') || [];
    this.roomId = this.navParams.get('roomId') || null;
  }

  async ionViewDidLoad() {
    if (this.task && this.task.currentTask && this.task.currentTask.status==TaskStatus.Runing){
      await this.task.fail(this.task.currentTask.id)
       
    }
    this.task.currentTask == null

  }

  reset(){
    this.stage = TaskStatus.Idle;
  }

  openSetting(){

    let a = this.modal.create('task-setting')
    a.onDidDismiss(_=>{
      let total = this.task.currentTask.totalTime;
      let relax = this.task.currentTask.relaxTime;
      this.tm.reset(total,relax);
      this.currentTime = this.tm.counterTotimer(total*60)
    })
    a.present();
    
  }

  async start(){

    if (!  (await this.ln.hasPermission())){
      this.ln.requestPermission();
    }

    

   
    
    if (!this.task.currentTask){
      this.openSetting();
      return;
    }
    this.task.startTask();
    let total = this.task.currentTask.totalTime;
    let relax = this.task.currentTask.relaxTime;
    this.tm.reset(total,relax);
    this.tm.start();
    this.stage = TaskStatus.Runing;

  }




  updateTime(val){
    
    this.currentTime = this.tm.timeStr;
  }


  endCircle(){
    this.stage = TaskStatus.End;
   
  }

  finishEvent(){
    this.stage = TaskStatus.Finish;
    this.task.finish(this.task.currentTask);   
  }

  giveUp(){

    let alert = this.alert.create({
      title: '放弃会导致本次失败',
      message: '你确定要放弃任务吗?',
      buttons: [
        {
          text: '继续专注',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '是的,我要放弃',
          handler: () => {
            this.stage = TaskStatus.Fail;
            this.tm.fail()
          }
        }
      ]
    });
    alert.present();



   
  }
  failEvent(val){
    this.stage = TaskStatus.Fail;
    if (val && this.task.currentTask.id)
    this.task.fail(this.task.currentTask.id);
   
  }

  skip(){
    this.tm.skipRelax();
  }

  repeat(){
    
    this.tm.skipRelax();
    this.start();
  }






  back(){
    this.view.dismiss();
  }

}
