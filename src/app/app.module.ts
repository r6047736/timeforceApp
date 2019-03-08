import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import{AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NgCircleProgressModule } from 'ng-circle-progress';


import { TimerManagerProvider } from '../providers/timer-manager/timer-manager';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { StorageProvider } from '../providers/storage/storage';
import { MotivationProvider } from '../providers/motivation/motivation';
import { Camera } from '@ionic-native/camera';
import { ImageProcessingProvider } from '../providers/image-processing/image-processing';
import { PresenceProvider } from '../providers/presence/presence';
import { DbProvider } from '../providers/db/db';

import { MomentModule } from 'ngx-moment';
import { RoomProvider } from '../providers/room/room';
import { TaskProvider } from '../providers/task/task';
import { ComponentsModule } from '../components/components.module';
import { FollowingProvider } from '../providers/following/following';
import { TodoProvider } from '../providers/todo/todo';

var firebaseConfig = {
  apiKey: "AIzaSyBwW2DKgpVN-bJP1fPV7dkKIoGdYj_kqAg",
    authDomain: "timeforce-de19c.firebaseapp.com",
    databaseURL: "https://timeforce-de19c.firebaseio.com",
    projectId: "timeforce-de19c",
    storageBucket: "timeforce-de19c.appspot.com",
    messagingSenderId: "936185733783"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      mode: 'md'
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MomentModule,
    ComponentsModule,
    NgCircleProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
   // {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimerManagerProvider,
    LocalNotifications,
    BackgroundMode,
    AuthProvider,
    DataProvider,
    StorageProvider,
    MotivationProvider,
    ImageProcessingProvider,
    PresenceProvider,
    DbProvider,
    RoomProvider,
    TaskProvider,
    FollowingProvider,
    TodoProvider
  ]
})
export class AppModule {}
