import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoListDetailPage } from './todo-list-detail';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    TodoListDetailPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(TodoListDetailPage),
  ],
})
export class TodoListDetailPageModule {}
