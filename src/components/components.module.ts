import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerComponent } from './timer/timer';
import { AnimatedHeaderComponent } from './animated-header/animated-header';
import { UserComponent } from './user/user';
import { MomentModule } from 'ngx-moment';
import { RoomComponent } from './room/room';
import { IonicModule } from 'ionic-angular';
import { UserWorkingStatusComponent } from './user-working-status/user-working-status';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TodoListComponent } from './todo-list/todo-list';


@NgModule({
	declarations: [TimerComponent,
    AnimatedHeaderComponent,
    UserComponent,
    RoomComponent,
    UserWorkingStatusComponent,
    TodoListComponent],
    imports: [CommonModule,IonicModule,MomentModule,  
        NgCircleProgressModule.forRoot({
        
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration: 300,
        showImage: true,
      })
    ],
	exports: [TimerComponent,
    AnimatedHeaderComponent,
    UserComponent,
    RoomComponent,
    UserWorkingStatusComponent,
    TodoListComponent]
})
export class ComponentsModule {}
