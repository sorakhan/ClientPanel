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

   addClient(client: Client) {
     this.clientsCollection.add(client); // adding to: AngularFirestoreCollection<Client>
   }

   getClient(id: string) : Observable<Client> {
     this.clientsDoc = this.afs.doc<Client>(`clients/${id}`);
     this.client = this.clientsDoc.snapshotChanges().pipe(map(action => {
       if (action.payload.exists === false) {
         return null;
       } else {
         const data = action.payload.data() as Client;
         data.id = action.payload.id;
         return data; // this is a client that gets stored in this.client variable
       }
     }));

     return this.client;
   }

   updateClient(client: Client) {
     // whatever client id we passed in is the one we are updating
     this.clientsDoc = this.afs.doc(`clients/${client.id}`);
     this.clientsDoc.update(client);
   }

   deleteClient(client: Client) { // same as update but...
    this.clientsDoc = this.afs.doc(`clients/${client.id}`);
    this.clientsDoc.delete();
   }
}
