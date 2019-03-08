import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomPage } from './room';
import { ComponentsModule } from '../../components/components.module';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    RoomPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomPage),
    ComponentsModule,
    MomentModule
  
  ],
})
export class RoomPageModule {}
