import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TimerManagerProvider } from '../../providers/timer-manager/timer-manager';

import { LocalNotifications } from '@ionic-native/local-notifications';


/**
 * Generated class for the TimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  { name: 'timer' }
)
@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  timer: any;
  counter: number;
  counterStr: string;
  swithedApp: boolean = false;  // If the user switch app


  abortStarttimer = 0;
  aborteffecttimer = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tm: TimerManagerProvider,
    public platform: Platform,
    public ln : LocalNotifications) {
    //alert(this.counterTotimer(130))
    this.initialTimerCounter(60);
    this.startTimer()
    this.tm.timerAbort.subscribe((data) => {
      this.swithedApp = true;
    })


    this.platform.pause.subscribe(()=>{
      this.abortStarttimer = new Date().getTime();
      console.trace("pause called");
      this.ln.schedule({
        title: 'You need go back',
        text: 'You will lose otherwise',
        attachments: ['file://img/rb-leipzig.jpg'],
        actions: [
            { id: 'yes', title: 'Yes' },
            { id: 'no',  title: 'No' }
        ]
      })
    })

    this.platform.resume.subscribe((data)=>{
      this.aborteffecttimer = new Date().getTime();
      let during = this.aborteffecttimer - this.abortStarttimer;
      if (during > 5*1000){
        this.abort();
        this.counterStr = "You didn't focus enought, failed";
      }
      console.log(`resume called you played ${during/1000} seconds`);
    })
  }

  


  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
  }
  ionViewDidLeave(){
    console.log("will leave")
    this.platform.pause.unsubscribe();
    this.platform.resume.unsubscribe();
    
  }

  counterTotimer(counter: number): string {
    let min = Math.floor(counter / 60);
    let second = Math.floor(counter % 60);

    let minstr = min < 10 ? "0" + min.toString() : min.toString()
    let secstr = second < 10 ? "0" + second.toString() : second.toString()
    return `${minstr}:${secstr}`;
  }
  timerToCounter(str: string): number {
    return 100;
  }

  initialTimerCounter(mins: number) {
    this.counter = mins;
    this.counterStr = this.counterTotimer(mins);
    this.tm.setTimerAbort(false);
    console.log()
  }



  startTimer() {
    let self = this;
    this.timer = setInterval(function () {
      if (self.counter > 0) {
        self.counter -= 1;
        self.counterStr = self.counterTotimer(self.counter);
        console.log("counting")
      }
      else {
        clearInterval(self.timer);
        console.log("end")
      }
    }
      , 1000)
  }

  finsihTimer() {
    alert("Good job, you nailed it")
  }

  giveup() {
    clearInterval(this.timer);
    alert("You failed")
  }
  abort() {

    clearInterval(this.timer);
    //alert("You failed")

  }

 



}
