import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer';
import { AnimatedHeaderComponent } from './animated-header/animated-header';
@NgModule({
	declarations: [TimerComponent,
    AnimatedHeaderComponent],
	imports: [],
	exports: [TimerComponent,
    AnimatedHeaderComponent]
})
export class ComponentsModule {}
