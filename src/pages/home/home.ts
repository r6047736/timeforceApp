import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

 import {AuthProvider}   from '../../providers/auth/auth';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
     public auth:AuthProvider,
    public modalCtrl: ModalController,
    ) {
     
  }

  start(){
    this.modalCtrl.create('time-main',{}).present();
    
  }
  motivation(){
    this.navCtrl.push('motivation-setting');
  }

}
