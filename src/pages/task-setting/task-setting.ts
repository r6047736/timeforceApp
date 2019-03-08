import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Toast, ToastController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';

/**
 * Generated class for the TaskSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'task-setting'
  }
)
@Component({
  selector: 'page-task-setting',
  templateUrl: 'task-setting.html',
})
export class TaskSettingPage {

  taskName:string;
  totalLength:number = 25;
  relaxLength:number = 5;
  

  hardcore:boolean = true;
 publicTitle:boolean = true;



  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public task: TaskProvider,
     private view: ViewController,
     public toast: ToastController) {
  }

  ionViewDidLoad() {
   
  }


  createNewTask(){
    console.log('creating task');
    return this.task.createATask(this.taskName,this.hardcore,this.totalLength,this.relaxLength,null,null,this.publicTitle)
  }

  async save(){
    if ( this.taskName && this.taskName !='' ){
      await  this.createNewTask()
      this.view.dismiss({total:this.totalLength});
    }
    else
     this.toast.create({message:'请填写任务名',duration:2000}).present();

    



   
  }

}
