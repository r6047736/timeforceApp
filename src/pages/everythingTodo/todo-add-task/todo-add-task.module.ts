import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoAddTaskPage } from './todo-add-task';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    TodoAddTaskPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(TodoAddTaskPage),
  ],
})
export class TodoAddTaskPageModule {}
