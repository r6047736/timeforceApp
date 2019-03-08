import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Title } from '@angular/platform-browser';
import { TodoProvider } from '../../../providers/todo/todo';

/**
 * Generated class for the TodoListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'todo-detail',
    segment:'todo-detail/:title',
    defaultHistory:['todo']
  }
)
@Component({
  selector: 'page-todo-list-detail',
  templateUrl: 'todo-list-detail.html',
})
export class TodoListDetailPage {

  title:string;
  todos:any;
  index:number;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public todo: TodoProvider,
     public alertController: AlertController,
     public toast: ToastController ){
    this.title = this.navParams.get('title');
    this.todos = this.navParams.get('todos');
    this.index = this.navParams.get('index');
    if (!this.todos)
      this.navCtrl.pop();
    
    

  }

  ionViewDidLoad() {

    //console.log('ionViewDidLoad TodoListDetailPage');
   // console.log(this.todo.todos);
   // console.log(this.title)
   // this.todos = this.todo.todos.filter( (todo)=> todo.title === this.title );
    if(this.todo.todos && this.todo.todos.length==0){
      
      setTimeout(() => {
        this.getTodos();
      }, 1000);
    }
    else{
      this.getTodos();
    }
  }

  getTodos(){
    if (!this.todo.todos || this.todo.todos.length==0){
      return;
    }

    for (let i =0; i<this.todo.todos.length; i++ ){
      if (this.todo.todos[i].title == this.title){
        this.todos = this.todo.todos[i]
        return; 
      }
    }
  }


  async setStartTime(todo){
    let result = await this.presentAlertConfirm()
    if (!result)
    return;
    todo.startTime = Date.now();
    this.todo.saveTodo()
  }


  async confirmUndo() {
    return new Promise((res,rej)=>{
      const alert = this.alertController.create({
        title: '注意',
        message: '该任务已完成, 确认要重置任务吗？ 会重置',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              res(null);
             }
           
          }, {
            text: '重置',
            handler: () => {
             res(true);
            }
          }
        ]
      });
       alert.present();
    })
  }


   check(todo){

    setTimeout(async () => {
      if (todo.check)
      this.todo.doneTask(todo);
      else{
          this.todo.undone(todo)   
      }
    }, 500);
  }

 

  async deleteWholeCategory() {

    return new Promise((res,rej)=>{
      const alert = this.alertController.create({
        title: '注意',
        message: '删除分类会删除当前分类下所有任务,确认删除吗？ (若要单独删除事项,可以左滑待定事项)',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              res(null);
             }
           
          }, {
            text: '确认删除',
            handler: () => {
           
             res(true);
            }
          }
        ]
      });
       alert.present();
    })
  }
  async deleteCategory(){
    let confirm = await this.deleteWholeCategory();

    if (confirm){
   
     this.todo.removeCategory(this.todos).then(()=>{this.navCtrl.pop()});
    }
  } 


  async presentAlertConfirm() {
    return new Promise((res,rej)=>{
      const alert = this.alertController.create({
        title: '开启计时!',
        message: '开启计时可以更清晰跟踪自己的工作时间',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              res(null);
             }
           
          }, {
            text: '开启计时',
            handler: () => {
             res(true);
            }
          }
        ]
      });
       alert.present();
    })
  }
  async confirmDelete() {
    return new Promise((res,rej)=>{
      const alert = this.alertController.create({
        title: '确认删除',
        message: '删除后不可恢复',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              res(false);
             }
           
          }, {
            text: '删除',
            handler: () => {
             res(true);
            }
          }
        ]
      });
       alert.present();
    })
  }

  async deleteTodo(todo){
    let confirm = await this.confirmDelete();
    if (confirm){
      for (var i=0; i< this.todos.todos.length; i++){
        if (this.todos.todos[i] == todo){
          this.todos.todos.splice(i,1);
          this.toast.create({message:'删除成功',duration:1000}).present();
          this.todo.saveTodo()
          return;
        }
      }
    }
  }




  isInToday(due){
   
    if (!due)
    return true

    let today = new Date();
    
    today.setHours(24);
    today.setMinutes(0);


   
    return new Date(due) < today
  }

  options(){
    
  }



}
