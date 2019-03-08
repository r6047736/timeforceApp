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
import { PresenceProvider } from '../presence/presence';



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

 

  user$: Observable<any>;
  uid: any;
  userRef: AngularFirestoreDocument;
  userdata: any;

  //userStatusFirestoreRef: AngularFirestoreDocument<any>;


  constructor(public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private presence: PresenceProvider
   
  ) {
    const self = this;

    this.user$ = this.afAuth.authState.pipe(switchMap( user =>{
      //console.log("auth state = ", user)
      if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      }
      else{
       
        return of(null);
      }
    }))



     

      this.user$.subscribe((data => {
     
        if (!data && !this.uid){
         
         this.loginNoname();
          return;
        }
        if (!data && this.uid){
          return;
        }
          
        if (data && data.uid) {
          this.userdata = data;
          this.uid = data.uid;
          this.userRef = this.afs.doc<User>(`users/${data.uid}`);
          //console.log("user.subscribe trigger, this.user.auth", data)
        }
      }))


    
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
   async signOut(){
    await this.presence.setPresence('offline');
    await this.afAuth.auth.signOut();
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
      photoURL: user.photoURL ? user.photoURL : 'https://firebasestorage.googleapis.com/v0/b/timeforce-de19c.appspot.com/o/avatar%2FgJXVCkkJGxdNcAN7EWSZ8BrBxfl21549937986435.jpeg?alt=media&token=b9fbfa9e-0d9e-4f8f-90a3-e5f333ca3641',
      gender: user.gender || "", 
      login_time: new Date()
    }
    return userRef.set( data, {merge:true });

  }

  updateUserName(userName){
    if (this.uid){
      return this.afs.doc(`users/${this.uid}`).set({
        displayName: userName,
      }, {
        merge:true})
    }
  }

  updateUserIntro(intro){
    if (this.uid){
      return this.afs.doc(`users/${this.uid}`).set({
        intro: intro,
      }, {
        merge:true})
    }
  }

  updateUserGender(gender){
    
      return this.afs.doc(`users/${this.uid}`).set({
        gender: gender,
      }, {
        merge:true})
    
    
  }
  updateUserAvatar(avatar){
   
      return this.afs.doc(`users/${this.uid}`).set({
        photoURL: avatar,
      }, {
        merge:true})
    
  }


  




}
