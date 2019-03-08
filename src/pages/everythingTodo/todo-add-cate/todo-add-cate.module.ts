import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoAddCatePage } from './todo-add-cate';

@NgModule({
  declarations: [
    TodoAddCatePage,
  ],
  imports: [
    IonicPageModule.forChild(TodoAddCatePage),
  ],
})
export class TodoAddCatePageModule {}
