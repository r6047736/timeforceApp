import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from "firebase/app";
import { tap, map, switchMap, first } from "rxjs/operators";
import { of } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

/*
  Generated class for the PresenceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class PresenceProvider {
  constructor(public auth: AngularFireAuth,
     public db: AngularFireDatabase,
     public afs: AngularFirestore) {
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
   // this.updateOnAway();
  }

  updateOnUser(){
      const connection = this.db.object('.info/connected').valueChanges().pipe(
        map(connected => connected ? 'online' : 'offline')
      )
      return this.auth.authState.pipe(
        switchMap(user => user ? connection : of('offline')),
        tap(status => this.setPresence(status))
      );

  }
  updateOnDisconnect(){
    return this.auth.authState.pipe(
      tap(user=>{
        if (user){
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
          .update({
            status:'offline',
            timestamp: this.timestamp
          })
        }
      })
    )
  }

  

  // updateOnAway(){
  //   try{
  //     document.onvisibilitychange = (e) =>{
  //       if (document.visibilityState === 'hidden'){
  //         this.setPresence('away');
  //       }
  //       else{
  //         this.setPresence('online')
  //       }
  //     }
  //   }catch(e){

  //   }
    
  // }







  getPresence(uid: string) {
    return this.db.object(`status/${uid}`).valueChanges();
  }
  getUser() {
    return this.auth.authState.pipe(first()).toPromise();
  }

  async setPresence(status:string){
    const user = await this.getUser();
    if (user){
      return this.db.object(`status/${user.uid}`)
      .set(
        {status:status, 
          random: Math.floor(Math.random() * 100000),
        timestamp: this.timestamp}
        )
    }
  }

  get timestamp(){
   
    return firebase.database.ServerValue.TIMESTAMP; 
  }

  getUserData(uid:string){
   return this.afs.doc(`users/${uid}`).valueChanges();
  }


}
