import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Keyboard } from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

//import { TimerPage } from '../pages/timer';
import {TimerManagerProvider} from '../providers/timer-manager/timer-manager';


import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ToastController } from 'ionic-angular';
import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar,
     public splashScreen: SplashScreen,
     private tm :TimerManagerProvider,
    private ln: LocalNotifications,
    private backgroundMode: BackgroundMode,
  private toast:ToastController,
  public auth:AuthProvider,
  public Keyboard: Keyboard) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '首页', component: HomePage },
      { title:'社区', component:'community'},
      { title:'事项',component:'todo'},
      
     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.Keyboard.hideFormAccessoryBar(false);
  

      this.backgroundMode.enable();
     
      console.log('is in background mode ? ',this.backgroundMode.isEnabled())
    });

    

    

    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
