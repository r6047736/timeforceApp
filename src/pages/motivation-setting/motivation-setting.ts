import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slide, Slides } from 'ionic-angular';
import { MotivationProvider } from '../../providers/motivation/motivation';
import {Motivation} from '../../app/types'
/**
 * Generated class for the MotivationSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */






@IonicPage(
  {
    name:'motivation-setting'
  }
)
@Component({
  selector: 'page-motivation-setting',
  templateUrl: 'motivation-setting.html',
})
export class MotivationSettingPage {

  @ViewChild ('slide') slides : Slides;


  motivationData:Motivation = {
    quote:"",
    shortTermGoal:"",
    longTermGoal:"",
    toSelfWeek:"",
    toSelfMonth:"",
    toSelfYear:"",
    roleModel:"",
    roleModelImage:"",
   }

  


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public motivation: MotivationProvider) {
  }

  ionViewDidLoad() {
    //this.motivationData = this.motivation.motivationData;
   
  }

  init(){
   // this.motivationData = this.motivation.motivationData;
  
  }
  saveData(){
    
    // console.log('motivation', this.motivationData );

     this.motivation.saveMotivation( this.motivation.motivationData );

  }

  swipeTo(index){
    this.slides.slideTo(index);
  }

  

   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

}
