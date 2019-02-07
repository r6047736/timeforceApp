import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import{AngularFirestoreModule} from '@angular/fire/firestore';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';



import { TimerManagerProvider } from '../providers/timer-manager/timer-manager';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { StorageProvider } from '../providers/storage/storage';
import { MotivationProvider } from '../providers/motivation/motivation';

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
    ListPage,
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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
   // {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimerManagerProvider,
    LocalNotifications,
    BackgroundMode,
    AuthProvider,
    DataProvider,
    StorageProvider,
    MotivationProvider
  ]
})
export class AppModule {}
