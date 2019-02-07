import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerSettingPage } from './timer-setting';

@NgModule({
  declarations: [
    TimerSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(TimerSettingPage),
  ],
})
export class TimerSettingPageModule {}
