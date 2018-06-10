import { HttpClient } from '@angular/common/http';
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

  constructor(public http: HttpClient,private st :Storage ) {
    console.log('Hello StorageProvider Provider');
    this.storage = st;
  }
  

  updateStorage(){

  }



}
