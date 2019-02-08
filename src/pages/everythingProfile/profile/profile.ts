import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'profile'
  }
)
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modal: ModalController) {
    

    

    
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  openSetting(){
    this.navCtrl.push('edit-profile')
    
  }

}
