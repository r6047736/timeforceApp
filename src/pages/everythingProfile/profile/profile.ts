import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { PresenceProvider } from '../../../providers/presence/presence';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskProvider } from '../../../providers/task/task';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'profile',
    segment:'profile/:uid',
    defaultHistory: ['community']

  }
)
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  uid:string;
  userData$:any;

  tasks$:any;

  hardcoreOnly$:any;



  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modal: ModalController,
     private auth: AuthProvider,
     private presence: PresenceProvider,
     private tasks:TaskProvider
     ) {
      
      this.uid = this.navParams.get('uid') || this.auth.uid;
     
      
   
  }

  ionViewDidLoad() {
   
    this.userData$ = this.presence.getUserData(this.uid)
    this.tasks$ = this.tasks.getAllTasksFromUID(this.uid)
    


    this.hardcoreOnly$ = this.tasks.getAllHardCoreTasksFromUID(this.uid);
    

  }

  openSetting(){
    this.navCtrl.push('edit-profile')
    
  }

}
