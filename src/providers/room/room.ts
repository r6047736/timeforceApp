
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from "firebase/app";
import { first } from 'rxjs/operators';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the RoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomProvider {

  constructor(public afs: AngularFirestore,
    public tost: ToastController,
    public auth: AuthProvider) {
  
    }


  getAllRooms(){
    return this.afs.collection('rooms').valueChanges();

  }

  getRoom(roomId){
    return this.afs.doc(`rooms/${roomId}`).valueChanges();
  }
  getUsersInTheRoom(roomId){
    return this.afs.collection(`rooms/${roomId}/users`).valueChanges();
  }


  get timestamp(){
    return firebase.firestore.FieldValue.serverTimestamp(); 
  }




  // if current has a task , cannot enter another room. 

 
  canEnter(roomId){
  
    if ( this.auth.userdata ){
      if (!this.auth.userdata.roomId )
      return true;
      else {
        if (this.auth.userdata.roomId  == roomId){
          return true;
        }
        else{
          return false;
        }
      }
    }
    else{
      return false;
    }
    
  }

  enterRoom(uid, roomId){
      let a  = this.afs.doc(`users/${uid}`).get().subscribe( (data:any)=>{
        a.unsubscribe();
        data = data.data();
        if (!data)
        return; 



        
            const oldRoomId = data.roomId;
            // console.log('entering room', data)
            if (oldRoomId == roomId)
            {
              console.log('already in the room, no action')
              return null;
            }

            if (oldRoomId)
              {
                this.afs.doc(`rooms/${oldRoomId}/users/${uid}`).delete();
              }
           
            
            
              return this.afs.doc(`rooms/${roomId}/users/${uid}`).set({
                uid:uid,
                timestamp: this.timestamp
              },{merge:true}) .then(()=>{
                this.afs.doc(`users/${uid}`).set({
                  roomId: roomId
                },{merge:true})
              })
      })    
  }

   async leaveRoom(uid){
     await this.afs.doc(`users/${uid}`).get().pipe(first()).subscribe((data:any)=>{
      data = data.data();
      if (!data)
      return null;
      else if (data.roomId)
      return this.afs.doc(`rooms/${data.roomId}/users/${uid}`).delete().then(()=>{
        this.afs.doc(`users/${uid}`).set({
          roomId: firebase.firestore.FieldValue.delete()
        },{merge:true})
      });
    })
  }




  getHistory(roomId){
    return this.afs.collection(`rooms/${roomId}/history`,ref=>ref.orderBy('createTime',"desc")).valueChanges();
  }


}
