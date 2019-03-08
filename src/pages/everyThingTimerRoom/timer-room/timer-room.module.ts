import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerRoomPage } from './timer-room';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TimerRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(TimerRoomPage),
    ComponentsModule
  ],
})
export class TimerRoomPageModule {}
