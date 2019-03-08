import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskSettingPage } from './task-setting';

@NgModule({
  declarations: [
    TaskSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskSettingPage),
  
  ],
})
export class TaskSettingPageModule {}
