import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimemainPage } from './timemain';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TimemainPage,
  ],
  imports: [
    IonicPageModule.forChild(TimemainPage),
    ComponentsModule
  ],
})
export class TimemainPageModule {}
