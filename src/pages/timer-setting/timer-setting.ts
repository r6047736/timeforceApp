import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TimerSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {name:'timer-setting'}
)
@Component({
  selector: 'page-timer-setting',
  templateUrl: 'timer-setting.html',
})
export class TimerSettingPage {

  taskName:string='';
  totalLength:number = 25;
  relaxLength:number = 5;
  repeatTime:number = 1;
  repeat:boolean = false;

  hardcoreMode:boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
   ) {
   
    this.taskName = this.navParams.get('TaskName')  || '';
    this.totalLength = (this.navParams.get('totalLength') /60 ) || 25;
    this.relaxLength = (this.navParams.get('relaxLength') /60 ) || 5 ;
    this.repeat = this.navParams.get('repeat') || 0;
    this.repeatTime = this.navParams.get('repeatTime') || 0;
    this.hardcoreMode = this.navParams.get('hardcoreMode') || false;
  }

  ionViewDidLoad() {
   
  }

  confirm(){
    this.viewCtrl.dismiss({
      taskName:this.taskName,
      totalLength:this.totalLength * 60,
      relaxLength:this.relaxLength * 60,
     // repeat: this.repeat,
      repeatTime: this.repeatTime
    })
  }

}
