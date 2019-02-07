import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TimerManagerProvider } from '../../providers/timer-manager/timer-manager';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the TimemainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'time-main'
  }

)
@Component({
  selector: 'page-timemain',
  templateUrl: 'timemain.html',
})
export class TimemainPage {


  taskName= ""  

  repeatTime :number;


  currentTime:string;
  counting:boolean= false;
  finish:boolean=false;
  fail:boolean = false;
  end:boolean = false;

  isRunning = this.data.isRunning;
  


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public tm:TimerManagerProvider,
    public modal: ModalController,
    public data: DataProvider) {
      this.currentTime = this.tm.timeStr;
      this.testValues()
  }


  testValues(){
    //this.repeatTime = 3;
    this.changeRelaxTime(1);
    this.changeTotalTime (1);
  }

  ionViewDidLoad() {
   
  }

  changeTotalTime(val){
    
    this.tm.totalTime = val
  }
  changeRelaxTime (val){
    this.tm.relaxTime = val
  }


  

  startTimer(){ 

    this.counting = false;
    this.finish = false;
    this.counting = true;
    this.fail = false;
    this.end= false;


 
    this.data.startOneCircle(this.taskName,
      new Date(), 0,this.tm.totalTime , this.tm.relaxTime  )
      this.tm.start();
   
  }
  

  startRelaxTimer(){
  }


  skipRelax(){
    this.tm.skipRelax();
    this.startTimer();
  }

  updateTime(val){

    this.currentTime = this.tm.timeStr
    this.counting = true;

  }
  finishEvent(val){

    if (val==true){
      this.finish = true;
      this.data.successCircle();
      console.log('task set to true')
    }
    

  }

  failTask(){
    this.data.failCircle();
    console.log('fail')
    this.finish=false;
    this.fail = true;
    this.counting = false;
    this.tm.fail();
  }


 
  endCircle(){
    
    if (this.repeatTime>0){
      console.log('trying repeat  task ')
      this.tm.reset(this.tm.totalTime, this.tm.relaxTime); 
      this.startTimer();
      this.repeatTime -= 1;
      console.log('trying repeat  task ')
    }
    else{
      
      this.counting = false;
      this.end = true;
      console.log('end task repeat finished')
    }
  }
  event(v){
    console.log('componenet, ',v);
  }

  openSetting(){

    console.log( this.tm.totalTime )
    console.log(this.tm.relaxTime )
    var mod = this.modal.create('timer-setting',{
      TaskName:this.taskName,
      totalLength: this.tm.totalTime ,
      relaxLength: this.tm.relaxTime ,
     // repeat :this.repeat,
      repeatTime: this.repeatTime
    })

    mod.onDidDismiss((data)=>{
      console.log('setting data to ', data )
      if (data.taskName){
        this.taskName = data.taskName;
      }
      if (data.repeatTime>0){
        this.repeatTime = data.repeatTime;
      }
      if (data.totalLength){
        this.changeTotalTime(data.totalLength);
      if (data.relaxLength){
       this.changeRelaxTime(data.relaxLength);
      }
      }
    })
    mod.present();
  }

}
