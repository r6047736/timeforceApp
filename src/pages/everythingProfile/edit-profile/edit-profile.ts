import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { ImageProcessingProvider } from '../../../providers/image-processing/image-processing';

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
     public tost: ToastController,
     public image: ImageProcessingProvider) {

  }

  ionViewDidLoad() {
  
    if (this.auth.userRef){
      let o =   this.auth.userRef.get().subscribe((data)=>{

         this.userName = data.data().displayName;
         o.unsubscribe();
       })
    }

  }

  async changeGender(){
  
      const actionSheet =  this.action.create({
      title:'性别',
        buttons: [{
          text: '男生',
          icon: 'custom-male',
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
          icon: 'custom-female',
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
          icon: 'custom-gender',
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
  

  


    changeAvatar(){
    
      const actionSheet =  this.action.create({
     
          buttons: [{
            text: '拍照',
            // icon: 'male',
            handler: () => {
              this.image.getImage('camera','').then((data)=>{
                this.image.uploadAvatar(data);
              });
            }
          }, {
            text: '相册',
            // icon: 'female',
            handler: () => {
              this.image.getImage('','').then((data)=>{
                this.image.uploadAvatar(data);
              });;
            }
          }
          , {
            text: '取消',
            // icon: 'close',
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
