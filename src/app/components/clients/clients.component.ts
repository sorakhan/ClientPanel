import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service'
import { Client } from '../../models/Client'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients : Client[];
  totalOwed : number;

  constructor(private clientService : ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
    
  }

  // could use a for loop and append the total value
  // but we use reduce() which is a higher order array method and modern to use !!
  // reduce() works similar to forEach
  getTotalOwed() {
    // reduce() takes two params:
    // previous value to add new value to and value of the current client we iterationg thru
    this.totalOwed = this.clients.reduce((total, currentClient) => {
      return total + currentClient.balance;
    }, 0); // the 0 is the initial value of total
  }

}
