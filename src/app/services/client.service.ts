import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // needed to import this cus map was not recognized

import { Client } from '../models/Client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection : AngularFirestoreCollection<Client>;
  clientsDoc : AngularFirestoreDocument<Client>;
  clients : Observable<Client[]>;
  client : Observable<Client>;

  constructor(private afs : AngularFirestore) { 
    // we're storing all our Clients from the afs db and ordering it by last name in ascending order
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
   }

   getClients() : Observable<Client[]> {
     this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => { // pipe needed for map         
       return changes.map(action => {
         const data = action.payload.doc.data() as Client;
         data.id = action.payload.doc.id;
         return data;
       });
     }));

     return this.clients;
   }
}
