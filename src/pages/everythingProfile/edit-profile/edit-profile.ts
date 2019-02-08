import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'edit-profile'
  }
)
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

    userName;
    gender;
    location;
    intro;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth:AuthProvider,
     public action:ActionSheetController,
     public tost: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    if (this.auth.userRef){
      let o =   this.auth.userRef.get().subscribe((data)=>{

         this.userName = data.data().displayName;
         o.unsubscribe();
       })
    }

  }

  async changeGender(){
    console.log('changing gender')
      const actionSheet =  this.action.create({
      title:'性别',
        buttons: [{
          text: '男生',
          icon: 'male',
          handler: () => {
            this.auth.updateUserGender('male').then(()=>{
              this.tost.create({
                message:'修改成功',
                duration:3000
                
              }).present();
            })
          }
        }, {
          text: '女生',
          icon: 'female',
          handler: () => {
            this.auth.updateUserGender('female').then(()=>{
              this.tost.create({
                message:'修改成功',
                duration:3000
                
              }).present();
            })
          }
        }, {
          text: '不愿透露',
          icon: 'heart',
          handler: () => {
            this.auth.updateUserGender('unknown').then(()=>{
              this.tost.create({
                message:'修改成功',
                duration:3000
                
              }).present();
            })

          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          
          }
        }]
      });
       actionSheet.present();
    }
  

  


  goTo(val){
    this.navCtrl.push(val)
  }





}
