import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataProvider } from '../../../providers/data/data';
import { AuthProvider } from '../../../providers/auth/auth';

/**
 * Generated class for the EditProfileUserNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(

  {name:'edit-userName'}
)
@Component({
  selector: 'page-edit-profile-user-name',
  templateUrl: 'edit-profile-user-name.html',
})
export class EditProfileUserNamePage {

  userName:string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth:AuthProvider,
     public tost: ToastController) {
  
  }

  ionViewDidLoad() {
  
    if (this.auth.userRef){
      let o =   this.auth.userRef.get().subscribe((data)=>{
         this.userName = data.data().displayName;
         o.unsubscribe();
       })
    }
   
   // this.userName = this.auth.userdata.displayName;
  }


  saveUserName(){
    if (this.userName.length>10){
      this.tost.create({message:'昵称过长',duration:2000}).present();
      return;
    }
    else{
      this.auth.updateUserName(this.userName).then(()=>{
        this.tost.create({message:'修改成功！',duration:2000}).present();
        this.navCtrl.pop();
      }).catch(()=>{
        this.tost.create({message:'修改失败请重试',duration:2000}).present();
      });


    }

  }

}
