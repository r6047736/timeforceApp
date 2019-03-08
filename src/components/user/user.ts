import { Component, Input } from '@angular/core';
import { PresenceProvider } from '../../providers/presence/presence';
import { Observable } from 'rxjs';

/**
 * Generated class for the UserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent {

  @Input() uid;

  presence$:Observable<{}>;;
  
  data$;
  


  constructor(
    private presencePrivider:PresenceProvider
  ) {
   
  }
    ngOnInit(){
    
      this.presence$ = this.presencePrivider.getPresence(this.uid);
     
      this.data$ = this.presencePrivider.getUserData(this.uid)
    
  }

}
