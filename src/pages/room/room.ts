import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { RoomProvider } from '../../providers/room/room';
import { Observable, of } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';
import { PresenceProvider } from '../../providers/presence/presence';
import { map, switchMap } from 'rxjs/operators';
import { TaskProvider } from '../../providers/task/task';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'room',
    segment: 'room/:roomId',
    defaultHistory: ['community']
  }
)
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  roomId:string;
  room$: Observable<any>;

  users$:Observable<any> ;

  history$:Observable<any>;



  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth:AuthProvider,
     public room: RoomProvider,
     public modal: ModalController,
    public task: TaskProvider,
     public presence: PresenceProvider,
     public loading:LoadingController) {
    this.roomId = this.navParams.get('roomId');
    this.room$ = this.room.getRoom(this.roomId);
    this.history$ = this.room.getHistory(this.roomId).pipe(map(taskIds=>{

      taskIds.forEach((element:any) => {
          element.data = this.task.getTask(element.taskId);
      });

      return taskIds;
      

    }))


    this.users$ = this.room.getUsersInTheRoom(this.roomId).pipe(map(data => {
      //return of(null);
      return data.map( (e:any) =>  {
        return {
          uid:e.uid,
          user: this.presence.getUserData(e.uid)
        }}
      );
    }))
    

    
    this.room$.subscribe(data=>{
      
        this.auth.afAuth.authState.subscribe((data)=>{
          if (data){
            this.room.enterRoom(this.auth.uid,this.roomId);
          }
        })
    })

    
  }






  ionViewDidLoad() {
   
  }
  exit(){


    this.room.leaveRoom(this.auth.uid);

    this.navCtrl.pop();

  }

  start(users){
   

    this.modal.create('timer-room',{
      roomId: this.roomId,
      users: users,
    }).present();


  }

}
