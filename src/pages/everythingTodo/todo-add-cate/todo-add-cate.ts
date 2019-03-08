import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Segment, ToastController } from 'ionic-angular';
import *  as random from 'randomcolor'
import { TodoProvider } from '../../../providers/todo/todo';
/**
 * Generated class for the TodoAddCatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name:'add-category',
    defaultHistory:['todo']
  }
)
@Component({
  selector: 'page-todo-add-cate',
  templateUrl: 'todo-add-cate.html',
})
export class TodoAddCatePage {

  title:string;
  colors:string[] =[];
  selectedColor:string;
  minimalism:boolean=false;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private toast: ToastController,
     public todo: TodoProvider) {
      this.generateRandomColors();
    
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad TodoAddCatePage');
  }


  generateRandomColors(){
    let l = 7;
    //console.log(random.randomColor());
    for (let j= 0; j< l; j++){
      let color = "hsl(" + Math.random() * (36*(360/l) ) + ", 100%, 66%)";
      this.colors.push(color);
    }
   
    //this.colors.s

  }

  pickColor(color){
      this.selectedColor = color;
      this.minimalism=false;
      this.minimalism=true;
     
    
  }

  async confirm(){
  
    if (!this.title || this.title=="")
    {
      this.toast.create({message:'请先填写类别名称',duration:2000}).present();
      return;
    }
    if (!this.selectedColor){
      this.toast.create({message:'请选择颜色',duration:2000}).present();
      return;
    }
    let result = await this.todo.addCategory(this.title,this.selectedColor,this.minimalism)
    if (result){
      this.navCtrl.pop();
    }
  }

}
