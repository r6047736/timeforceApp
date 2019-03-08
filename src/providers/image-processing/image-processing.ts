
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform, Toast, ToastController } from 'ionic-angular';
import { AngularFireUploadTask, AngularFireStorage, } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import {tap,finalize} from 'rxjs/operators'
import { AuthProvider } from '../auth/auth';


/*
  Generated class for the ImageProcessingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProcessingProvider {

  task: AngularFireUploadTask;
  percentage:Observable<number>

  snapshot:Observable<any>;

  downloadURL:Observable<string>;




  constructor(public camera: Camera,
    public platform: Platform,
    public tost: ToastController,
    public aStorage: AngularFireStorage,
    public auth: AuthProvider,
   ) {
   
  }




   dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    // else
    //     byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}


   getImage(sourceType, option?){
     return new Promise((res,rej)=>{
      let  options: CameraOptions = {
        quality: 90,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth:500,
        targetHeight:500
      }
      if (sourceType=="camera"){
        options.sourceType =this.camera.PictureSourceType.CAMERA
      }
      else{
        options.sourceType =this.camera.PictureSourceType.PHOTOLIBRARY
      }
  
      
      this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let x = this.dataURItoBlob(base64Image);
        console.log(x);
        
       res(x); 
      }, (err) => {
        this.tost.create({message:'选择照片失败，请重试', duration:2000}).present();
       // Handle error
       rej();
      });
  
      

     })
  
   



  }


  uploadAvatar(blob){
    
    if (!this.auth.uid){
        this.tost.create({message:'上传失败, 请检查网络/登录信息',duration:2000}).present();
        return
    }
      const path = `avatar/${this.auth.uid}${new Date().getTime()}.jpeg`;
      const customeMetaData ={
        app:'upload avatar',
        contentType: 'image/jpeg'
      }

      this.task = this.aStorage.upload(path, blob, customeMetaData )
      console.log('start uploading');

      //const fileRef = this.aStorage.ref(path)
      this.percentage = this.task.percentageChanges()
      this.percentage.subscribe((data)=>{
        console.log(data);
      });

      this.snapshot = this.task.snapshotChanges();
      this.snapshot.pipe(
        finalize(() => {
          this.downloadURL = this.aStorage.ref(path).getDownloadURL()
          this.downloadURL.subscribe(data=>{
            if (data){
              console.log(' url is ', data)
               this.auth.updateUserAvatar(data);
            }
          })} )
     )
    .subscribe()
    



  }

}
