import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { TodoProvider } from '../../../providers/todo/todo';

/**
 * Generated class for the TodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'todo'
  }
)
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
})
export class TodoPage {

  @ViewChild ('slides') slides : Slides;
  tab:number= 0;


  




  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public todo: TodoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoPage');
   
  }
  ionViewDidEnter(){
   
    this.todo.updateTodayTasks();
    
  }



  goTo(index){
    this.tab = index;
   
    this.slides.slideTo(index);
  }

  openAdd(){
    this.navCtrl.push('add-category');
  }
  openAddTask(){
    this.navCtrl.push('add-task');
  }

  goToDetail(title,todos,index){

    this.navCtrl.push('todo-detail',{
      title: title,
      todos:todos,
      index: index
    })

  }


  check(todo){
    if (!todo.check){
     
      todo.check = !todo.check;
      this.doneTask(todo);

      setTimeout(()=>{
        this.todo.updateTodayTasks();
      },500)
     
    }


    
   
  }

  undone(todo){
    todo.status = '';
    let now = Date.now();
    todo.startTime = null;
    todo.endTime = null;
    this.todo.saveTodo()
   
  }

  doneTask(todo){
    todo.status = 'done';
    let now = Date.now();
    if (!todo.startTime || todo.startTime > now)
    todo.startTime = now;
    todo.endTime = now;
    this.todo.saveTodo()
  }

  

}
