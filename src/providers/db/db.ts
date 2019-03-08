
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { switchMap, map} from 'rxjs/operators';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  constructor(
    public db: AngularFireDatabase,
    public afs: AngularFirestore) {

    

  }

  listAllOnline(){
    return this.db.list('status',ref =>ref.orderByChild('status').equalTo('online')).snapshotChanges()
  }

  listAllAway(){
    return this.db.list('status',ref =>ref.orderByChild('status').equalTo('away')).valueChanges();
  }
  listAllOffline(){
    return this.db.list('status',ref =>ref.orderByChild('status').equalTo('offline')).valueChanges();
  }

}
