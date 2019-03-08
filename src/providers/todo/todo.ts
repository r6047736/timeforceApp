import { Injectable } from "@angular/core";
import { storage } from "firebase";
import { StorageProvider } from "../storage/storage";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
import { AngularFirestore } from "@angular/fire/firestore";

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  todos = [];
  todoLoaded: BehaviorSubject<any>;

  todayTasks = [];
  overTodayTasks = {done:[],running:[],pending:[]};

  tomorrowTasks = [];

  beforeTodayD: any;
  todayD: any;
  tomorrowD: any;
  weekD: any;

  constructor(
    public storage: Storage,
    public toast: ToastController,
    public afs: AngularFirestore
  ) {
    this.setTodayTomorrowAndWeek();
    this.storage.get("todo").then(data => {
   
      if (!data) {
        this.todos = this.defaultTodo();
        this.storage.set("todo", this.defaultTodo());
      } else {
        this.todos = data;

        this.updateTodayTasks();
      }
    });

    //this.storage.remove('todo');
  }

  setTodayTomorrowAndWeek() {
    let today = new Date();
    today.setHours(24, 0, 0, 0);
    console.log("provider today = ", today);
    this.todayD = today.getTime();

    let beforeTodayD = new Date();
    beforeTodayD.setHours(0, 0, 0, 0);
    console.log("before Today is ", beforeTodayD);
    // beforeTodayD.setDate(today.getDate() - 1);
    this.beforeTodayD = beforeTodayD.getTime();

    let tomorrowD = new Date();
    tomorrowD.setHours(48, 0, 0, 0);
    //  tomorrowD.setDate(today.getDate()+1);
    this.tomorrowD = tomorrowD.getTime();

    console.log("provider tomorrow = ", tomorrowD);

    let weekD = new Date();
    weekD.setHours(24, 0, 0, 0);
    weekD.setDate(weekD.getDate() + 7);
    this.weekD = weekD.getTime();

    console.log("provider week = ", weekD);
  }

  updateOverAllTodayTasks() {
  
    let a = {done:[],running:[],pending:[]};
    if (!this.todos) return;

    this.todos.forEach((cate, index) => {
      cate.todos.forEach(todo => {
        if (todo.date <= this.todayD) {
        }
        if (todo.date > this.beforeTodayD && todo.date <= this.todayD) {
          if (todo.status=='done' )
            a.done.push(a)
          else if(todo.startTime){
            a.running.push(a)
          }
          else{
            a.pending.push(a)
          }
        }
      });
    });
    this.overTodayTasks = a;
  
  }

  updateTodayTasks(hardLoad?: boolean) {
    let a = [];
    if (!this.todos) return;

    this.updateOverAllTodayTasks();

    if (
      hardLoad ||
      this.todayTasks.length == 0 ||
      this.todayTasks.length != this.todos.length
    ) {
      this.todos.map(category => {
        const doneTask = category.todos.filter(
          todo =>
            todo.status == "done" &&
            ( 
              (todo.date <= this.todayD && todo.date > this.beforeTodayD))
        );
        const undoneTask = category.todos.filter(
          todo =>
            (!todo.status || todo.status != "done") &&
            (
              (todo.date <= this.todayD && todo.date > this.beforeTodayD))
        );
        a.push({
          color: category.color,
          icon: category.icon,
          mode: category.mode,
          title: category.title,
          todos: {
            done: doneTask,
            pending: undoneTask
          }
        });
      });
      this.todayTasks = a;
      return;
    } else {
      this.todayTasks.forEach((category, index) => {
        //  let todaysTasksLength = 0;

        //  this.todos[index].todos.forEach(element => {
        //     if ((!element.status || element.status!='done' ) && element.date <= this.todayD){
        //       todaysTasksLength+=1;
        //     }
        //  });
        //  console.log( 'outer', category.todos ,todaysTasksLength )

        // if (category.todos.pending.length + category.todos.done.length != todaysTasksLength ){
        //  console.log('hard mode call' , category.todos , "",todaysTasksLength )

        //   this.updateTodayTasks(true);

        //   return;
        // }

        for (let i = 0; i < category.todos.pending.length; i++) {
          if (category.todos.pending[i].status == "done") {
            category.todos.done.push(category.todos.pending[i]);
            category.todos.pending.splice(i, 1);
          }
        }
        for (let i = 0; i < category.todos.done.length; i++) {
          if (
            !category.todos.done[i].status ||
            category.todos.done[i].status != "done"
          ) {
            category.todos.pending.push(category.todos.done[i]);
            category.todos.done.splice(i, 1);
          }
        }
      });
    }
  }

  async addCategory(name, color, mode, icon?) {
    for (let todo of this.todos) {
      if (todo.title == name) {
        this.toast
          .create({
            message: "分类已存在",
            duration: 2000
          })
          .present();
        return false;
      }
    }

    let cate = {
      title: name,
      icon: icon || null,
      color: color,
      mode: mode ? "minimalism" : "reminder",
      todos: []
    };
    this.todos.push(cate);
    this.storage.set("todo", this.todos);
    this.toast
      .create({
        message: "成功",
        duration: 2000
      })
      .present();
    return true;
  }
  async removeCategory(c) {
    console.log(2323);
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].title == c.title && this.todos[i].color == c.color) {
        this.todos.splice(i, 1);
        break;
      }
    }

    this.updateTodayTasks();
    this.saveTodo();
    this.toast
      .create({
        message: "分类已删除",
        duration: 2000
      })
      .present();
    return true;
  }

  async addTaskToCategory(title, category, date?) {
    if (!date) date = this.todayD;

    for (var todo of this.todos) {
      if (todo.title == category.title) {
        todo.todos.push({
          title: title,
          date: date || null,
          createAt: Date.now(),
          id: this.afs.createId()
        });
      }
    }
    this.updateTodayTasks(true);
    this.storage.set("todo", this.todos);
    this.toast
      .create({
        message: "添加成功",
        duration: 2000
      })
      .present();
    return true;
  }
  saveTodo() {
    this.storage.set("todo", this.todos);
  }

  undone(todo) {
    todo.status = "";
    let now = Date.now();
    todo.startTime = null;
    todo.endTime = null;
    this.updateTodayTasks();
    this.saveTodo();
  }
  doneTask(todo) {
    todo.status = "done";
    let now = Date.now();
    if (!todo.startTime || todo.startTime > now) todo.startTime = now;
    todo.endTime = now;
    this.updateTodayTasks();
    this.saveTodo();
  }

  defaultTodo() {
    return [
      {
        title: "学习",
        icon: "school",
        color: "#6691EF",
        mode: "minimalism",
        todos: []
      },
      {
        title: "工作",
        icon: "briefcase",
        color: "#F5AE64",
        mode: "minimalism",
        todos: []
      },
      {
        title: "运动",
        icon: "american-football",
        color: "#1BCF65",
        mode: "minimalism",
        todos: []
      },
      {
        title: "自我提升",
        icon: "person-add",
        color: "#B647BD",
        mode: "minimalism",
        todos: []
      },
      {
        title: "其他",
        icon: "bookmarks",
        color: "#1B59CF",
        mode: "minimalism",
        todos: []
      }
    ];
  }
}
