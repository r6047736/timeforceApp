import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable, Subscription } from "rxjs";
import { updateDate } from "ionic-angular/umd/util/datetime-util";
import { Platform, ToastController } from "ionic-angular";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { StorageProvider } from "../storage/storage";

/*
  Generated class for the TimerManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

enum stage {
  workingStage = 1,
  relaxStage,
  finishStage,
  failStage
}
@Injectable()
export class TimerManagerProvider {
  devSpeed: number = 1;

  startEmmiter = new BehaviorSubject<boolean>(null);
  updateEmmiter = new BehaviorSubject<number>(null); // playing end
  pauseEmmiter = new BehaviorSubject<boolean>(null);
  finishEmmiter = new BehaviorSubject<boolean>(null);
  endEmmiter = new BehaviorSubject<boolean>(null);
  failEmmiter = new BehaviorSubject<boolean>(null);

  hcPauseSub = new Subscription();
  hcResumeSub = new Subscription();

  timer: any;

  stage: stage = stage.workingStage;

  _totalTime: number;
  _relaxTime: number;
  _currentTime: number;
  timeStr: string;

  pauseFrom: number;
  pauseTo: number;

  private pauseLimit = 10; //in seconds

  get totalTime() {
    return this._totalTime || -1;
  }
  set totalTime(val) {
    this._totalTime = val;
    this.currentTime = val;
  }
  get relaxTime() {
    return this._relaxTime || -1;
  }
  set relaxTime(val) {
    this._relaxTime = val;
  }

  get currentTime() {
    return this._currentTime || -1;
  }
  set currentTime(val) {
    this._currentTime = val;
    this.timeStr = this.counterTotimer(val);
  }

  constructor(public platform: Platform,
     public ln: LocalNotifications,
     public toast:ToastController) {}

  public counterTotimer(counter: number): string {
    let min = Math.floor(counter / 60);
    let second = Math.floor(counter % 60);
    let minstr = min < 10 ? "0" + min.toString() : min.toString();
    let secstr = second < 10 ? "0" + second.toString() : second.toString();
    return `${minstr}:${secstr}`;
  }

  reset(totalTime?, relaxTime?) {
    if (!this.relaxTime) {
      this.relaxTime = 300;
    }
    if (totalTime) this.totalTime = totalTime *60;
    if (relaxTime) this.relaxTime = relaxTime *60;
    this.pauseFrom = null;
    this.pauseTo = null;
  }

  start() {
    this.startEmmiter.next(true);
    // console.log('in tm, line 90')

    
    this.platform.ready().then(() => {
      this.hcPauseSub = this.platform.pause.subscribe(() => {
        this.pauseFrom = new Date().getTime();
       
        this.ln.schedule({
          id: 1,
          title: "正在集中精神中...",
          text: "自制力在哪里? 10秒后本次任务视为失败"
        });
      });





      this.hcResumeSub = this.platform.resume.subscribe(data => {
        if (!this.pauseFrom) return;
        this.pauseFrom = null;
        console.log('backtowork')
       
        // this.pauseTo = new Date().getTime();
        // let during = this.pauseTo - this.pauseFrom;
        // console.log(`paused for ${during / 1000} s`);
        // if (during > this.pauseLimit * 1000) {
        //   this.failEmmiter.next(true);
        //   console.log("falied ");
        //   this.fail();
        //   this.stage = stage.failStage;
        // } else {
        //   console.log("continue working ");
        // }
      });
    });
    this.currentTime = this.totalTime;
    this.stage = stage.workingStage;
    clearInterval(this.timer);
    this.timer = null;
    console.log("this.timer clean");

    var self = this;
    this.timer = setInterval(function() {
      

      self.update();
    }, 1000 / this.devSpeed);
    console.log("line 151");
  }
  private startRelax() {
    var self = this;
    this.stage = stage.relaxStage;
    this.currentTime = this.relaxTime;
    this.timer = setInterval(function() {
      console.log("timer running in stage : relaxing ");
      self.update();
    }, 1000 / this.devSpeed);
  }

  private update() {
    console.log("updating");
    if (this.currentTime > 0) {
      this.currentTime -= 1;
      this.updateEmmiter.next(this.currentTime);
      if (this.pauseFrom && this.stage == stage.workingStage){
          if (Date.now() - this.pauseFrom > (this.pauseLimit * 1000) ){
            this.ln.schedule({
              id: 1,
              title: "本次任务失败..",
              text: "壮士还需加油."
            });
            this.fail();
          }
      }

      if (this.currentTime < 0 && this.stage == stage.workingStage) {
        this.finish();
        this.startRelax();
      }
      if (this.currentTime < 0 && this.stage == stage.relaxStage) {
        this.end();
      }
    }
  }

  skipRelax() {
    this.end();
  }

  private finish() {

    this.ln.schedule({
      id: 1,
      title: "完成",
      text: `不错嘛, 这${this.totalTime}分钟必然有所收获吧`
    });

    this.hcPauseSub.unsubscribe();
    this.hcResumeSub.unsubscribe();
    clearInterval(this.timer);
    this.finishEmmiter.next(true);
  }
  private end() {
    this.hcPauseSub.unsubscribe();
    this.hcResumeSub.unsubscribe();
    console.log("officially end");
    clearInterval(this.timer);
    console.log("clear timer here");

    this.endEmmiter.next(true);
    this.reset(this.totalTime, this.relaxTime);
  }
  fail() {
    this.hcPauseSub.unsubscribe();
    this.hcResumeSub.unsubscribe();
    clearInterval(this.timer);
    this.failEmmiter.next(true);
  }
}
