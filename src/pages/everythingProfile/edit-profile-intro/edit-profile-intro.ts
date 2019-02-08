import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';

/**
 * Generated class for the EditProfileIntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'edit-intro'
  }
)
@Component({
  selector: 'page-edit-profile-intro',
  templateUrl: 'edit-profile-intro.html',
})
export class EditProfileIntroPage {

  intro:string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth:AuthProvider,
     public tost: ToastController,
     ) {
  }

  ionViewDidLoad() {
   
    if (this.auth.userRef){
      let o =   this.auth.userRef.get().subscribe((data)=>{
         this.intro = data.data().intro;
         o.unsubscribe();
       })
    }

  }

  saveUserIntro(){
    if (this.intro.length>40){
      this.tost.create({message:'个性签名长度小于40字',duration:2000}).present();
      return;
    }
    else{
      this.auth.updateUserIntro(this.intro).then(()=>{
        this.tost.create({message:'修改成功！',duration:2000}).present();
        this.navCtrl.pop();
      }).catch(()=>{
        this.tost.create({message:'修改失败请重试',duration:2000}).present();
      });


    }

  }

}
