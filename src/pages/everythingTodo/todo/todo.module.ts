import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoPage } from './todo';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TodoPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoPage),
    ComponentsModule
  ],
})
export class TodoPageModule {}
