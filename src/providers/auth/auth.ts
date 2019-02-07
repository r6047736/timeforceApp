import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';


import { Observable } from 'rxjs/observable';

import { of, merge } from "rxjs";
import 'rxjs/add/operator/switchMap';

import { User } from '../../app/types';

import * as firebase from 'firebase/app';

import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  userId: string;


  user$: Observable<any>;
  uid: any;
  userRef: AngularFirestoreDocument;
  userdata: any;

  //userStatusFirestoreRef: AngularFirestoreDocument<any>;


  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
   
  ) {
    const self = this;


    var isOfflineForFirestore = {
      state: 'offline',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };
  
  var isOnlineForFirestore = {
      state: 'online',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };



    this.user$ = this.afAuth.authState.pipe(switchMap( user =>{

      if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      }
      else{
        this.loginNoname();
        return of(null);
      }



    }))



     

      this.user$.subscribe((data => {
        console.log(data);
        if (!data && self.uid){
         
          return;
        }
          
        if (data && data.uid) {
          this.userdata = data;
          //console.log("line 55", data)
          this.uid = data.uid;
          this.userRef = this.afs.doc<User>(`users/${data.uid}`);
          //console.log("user.subscribe trigger, this.user.auth", data)
        }
      }))


    
  }


  private updateStatus(status: string) {
    if (!this.userId) return

    //this.db.object('users/' + this.userId).update({ status: status });


  }

  private updateOnconnect() {
    // return this.db.object('.info/connected').valueChanges().subscribe
    //   (connected => {
    //     console.log(connected);
    //     //let status = connected.$value
    //   })
  }

  public async signInGoogle() {

    console.log("login noname called");
    await this.loginNoname();

    //console.log("login successful")
  }
  async loginNoname(){
    return this.afAuth.auth.signInAnonymously().then(data=>{
      console.log("data ",data)
      this.updateUserData(data.user)
    })
  }
   signOut(){
    this.afAuth.auth.signOut();
  }

  async oAuthLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider)
  }

  updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data={
      uid:user.uid,
      email: user.email,
      displayName: user.displayName ,
      photoURL: user.photoURL ,
      login_time: new Date()
    }
    return userRef.set( data, {merge:true });

  }
  




}
