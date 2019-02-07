
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { ToastController } from 'ionic-angular';
import {Motivation} from '../../app/types'
/*
  Generated class for the MotivationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MotivationProvider {

  motivationObs: Observable<any>;
  sub:Subscription;
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
    public auth: AuthProvider,
    public afs: AngularFirestore,
    public tost : ToastController
    ) {
    auth.user$.subscribe((data)=>{
      if (data.uid){
        this.getMotivation();
      }
    })




  }

  getMotivation(){
    if (this.auth.uid){
      if (this.sub) this.sub.unsubscribe();
      this.motivationObs = this.afs.doc(`motivation/${this.auth.uid}`).valueChanges();
      this.sub = this.motivationObs.subscribe((data)=>{

        if (data){
          console.log('reading new motivation data ', data);
          this.motivationData = data;
        }
      
      })
    }

  }
  saveMotivation(motivation){
    if (this.auth.uid){
    this.afs.doc(`motivation/${this.auth.uid}`).set(motivation,{merge:true}).then(_=>{
      this.tost.create({message:'信息更新',duration:3000,position:'top'}).present();
    })
    }
  }


}
