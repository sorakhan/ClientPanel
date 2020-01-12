import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;

  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private clientService: ClientService, 
    private flashMsgs: FlashMessagesService
  ) { }

  ngOnInit() {
    // get id of individual client from url
    this.id = this.route.snapshot.params['id'];

    // get client based on id
    this.clientService.getClient(this.id).subscribe(client => {
      if (client) {
        this.client = client;
        if (this.client.balance > 0) this.hasBalance = true;
      }
      console.log(this.client);
    });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMsgs.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm("Are you sure?")) { // if yes to delete
      this.clientService.deleteClient(this.client);
      this.flashMsgs.show('Client removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(["/"]); // go back to homepage

    }
  }

}
