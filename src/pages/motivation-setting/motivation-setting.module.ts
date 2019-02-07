import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MotivationSettingPage } from './motivation-setting';

@NgModule({
  declarations: [
    MotivationSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(MotivationSettingPage),
  ],
})
export class MotivationSettingPageModule {}
