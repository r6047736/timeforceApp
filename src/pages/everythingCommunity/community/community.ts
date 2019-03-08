import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';
import { DbProvider } from '../../../providers/db/db';
import { Observable } from 'rxjs';
import { RoomProvider } from '../../../providers/room/room';
import { auth } from 'firebase';
import { AuthProvider } from '../../../providers/auth/auth';

/**
 * Generated class for the CommunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'community'
  }
)
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {

  allOnlineUsers$:any;

  rooms$:Observable<any>;
  
  quote:string;

  @ViewChild ('slides') slides : Slides;
  tab:number= 0;


  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public db: DbProvider,
     public room: RoomProvider,
     public tost: ToastController,
     public auth: AuthProvider) {
      this.allOnlineUsers$ = this.db.listAllOnline();
      this.allOnlineUsers$.subscribe((data)=>{
   
      })
      this.rooms$ = this.room.getAllRooms();

    this.quote = this.getQoute();
  }

  ionViewDidLoad() {
    
  }
  ionViewWillEnter() {
  
    if (this.auth.userdata){
      if (this.auth.userdata.displayName=="" || !this.auth.userdata.intro || !this.auth.userdata.gender )
      {
        this.tost.create({
          message:'请先完善个人资料',
          duration:2000
        }).present();

        this.navCtrl.push('edit-profile');
      }
    }
    return false;
    
    
    
    
  }


  goToRoom(roomId){
    if (this.room.canEnter(roomId)){
      this.navCtrl.push('room',{roomId:roomId});
    }
    else{
      this.tost.create({
        message:'请先退出目前的房间',
        duration:2000
      }).present();
    }
   
  }

  

  goTo(index){
    this.tab = index;
   
    this.slides.slideTo(index);

  }

  swipeTo(e){
   // console.log(e._)
   if (e._activeIndex>2)
    return;
    this.tab = e._activeIndex;
    
  }



 

    

  list=[
    "心情不好时，要经常问自己，你有什么而不是没有什么",
    "你需要回炉重造",
    "Done is better than perfect",
    "不积跬步，无以至千里；不积小流，无以成江海",
    "再长的路，一步步也能走完，再短的路，不迈开双脚也无法到达。",
    "如果再给你一次机会, 你会让去年今日的自己开始做什么？"
  ]

getQoute(){
  return  this.list[Math.floor(Math.random()*this.list.length)];
}


}
