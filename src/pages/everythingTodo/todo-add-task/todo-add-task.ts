import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Keyboard, ToastController } from "ionic-angular";
import { TodoProvider } from "../../../providers/todo/todo";

/**
 * Generated class for the TodoAddTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "add-task",
  defaultHistory: ["todo"]
})
@Component({
  selector: "page-todo-add-task",
  templateUrl: "todo-add-task.html"
})
export class TodoAddTaskPage {
  category: string;
  title: string;
  datetime: string;

  today: string;
  tomorrow: string;
  week: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public keyboard: Keyboard,
    public todo: TodoProvider,
    public toast: ToastController
  ) {
    //this.category = this.navParams.get('category');

    var todayD = new Date();
    this.today = todayD.toISOString().split('T')[0]
    var tomorrowD = new Date();
    tomorrowD.setDate(todayD.getDate() + 1);
    this.tomorrow =   tomorrowD.toISOString().split('T')[0]
    var weekD = new Date();
    weekD.setDate(todayD.getDate() + 7);
    this.week =  weekD.toISOString().split('T')[0]
  }




  ionViewDidLoad() {}
  pickCategory(category) {
    this.category = category;
  }
  async addTaskToCategory() {




    if (!this.title || this.title=="" ){
      this.toast.create({message:'请填写任务名称',duration:1000}).present();
      return;
    }
    if (!this.category || this.category=="" ){
      this.toast.create({message:'请选择任务所属分类',duration:1000}).present();
      return;
    }

    
    let datetime:any = this.datetime;  //TODO should convert to number anyway

    if (this.datetime == this.today ){
      datetime =   new Date().setHours(24,0,0,0);
    }

     else if (this.datetime == this.tomorrow )
      datetime =   new Date().setHours(48,0,0,0);
     else if (this.datetime == this.week )
      datetime =   new Date().setHours(24*7,0,0,0);
    else {
      datetime =   new Date(this.datetime).setDate( new Date(this.datetime).getDate()+1 );
    }

    
    let result = await this.todo.addTaskToCategory(this.title,this.category,datetime);
    if (result) this.navCtrl.pop()
    
  }

  setTime(val) {
    switch (val) {
      case "today":
      this.datetime =   this.today;
      break;
      case "tomorrow":
      this.datetime = this.tomorrow;
      break;
      case "week":
      this.datetime = this.week;
      break;

    }

  

  }

  
}
