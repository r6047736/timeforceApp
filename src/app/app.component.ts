import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
//import { TimerPage } from '../pages/timer';
import {TimerManagerProvider} from '../providers/timer-manager/timer-manager';


import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ToastController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
     public splashScreen: SplashScreen,
     private tm :TimerManagerProvider,
    private ln: LocalNotifications,
    private backgroundMode: BackgroundMode,
  private toast:ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Ranking', component: 'timer' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log(this.backgroundMode.isEnabled())

      let toast1 = this.toast.create({
        message: 'User was added successfully',
        duration: 3000,
        position: 'top'
      });
      toast1.present();

      
      //this.backgroundMode.disable();

/*
      this.platform.pause.subscribe(()=>{
        console.trace("pause called");
        this.ln.schedule({
          title: 'You need go back',
          text: 'You will lose otherwise',
          attachments: ['file://img/rb-leipzig.jpg'],
          actions: [
              { id: 'yes', title: 'Yes' },
              { id: 'no',  title: 'No' }
          ]
        })
      })
      document.addEventListener('pause', () => {
        console.log("paused")
       },false)
  
      this.platform.resume.subscribe((data)=>{
        console.trace("resume called");
      })

      */
    });

    

    

    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
