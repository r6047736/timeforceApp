
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  storage: Storage;

  constructor(private st :Storage ) {
    console.log('Hello StorageProvider Provider');
    this.storage = st;
  }
  

  updateStorage(){

  }

   get(key){
    return  this.st.get(key);
  }
  async set(key,val){
    return await this.st.set(key, val);
  }

  async remove(key){
    return await this.st.remove(key);
  }




}
