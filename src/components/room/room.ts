import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomProvider } from '../../providers/room/room';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the RoomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'room',
  templateUrl: 'room.html'
})
export class RoomComponent {

  @Input() roomId;

  room$:Observable<any>;;
  
  users$:Observable<any>;
  length :number = 0;

 

  constructor(private room : RoomProvider, private navCtrl:NavController) {


  }

  ngOnInit(){
    this.room$ = this.room.getRoom(this.roomId);
    this.users$ = this.room.getUsersInTheRoom(this.roomId);

    this.users$.subscribe(data=>{
      this.length = data.length
    })
}



}
