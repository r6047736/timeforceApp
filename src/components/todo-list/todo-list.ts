import { Component, Input } from '@angular/core';

/**
 * Generated class for the TodoListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'todo-list',
  templateUrl: 'todo-list.html'
})
export class TodoListComponent {

 
  @Input() text;

  constructor() {
    
  }

  ngOnInit(){

  }


  

}
