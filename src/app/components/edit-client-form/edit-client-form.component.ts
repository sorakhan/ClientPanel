import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from '../../models/Client';
import { ClientService } from 'src/app/services/client.service'; // importing in order to add client thru Service

@Component({
  selector: 'app-edit-client-form',
  templateUrl: './edit-client-form.component.html',
  styleUrls: ['./edit-client-form.component.css']
})
export class EditClientFormComponent implements OnInit {

  id : string;

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true;

  constructor(
    private flashMsg : FlashMessagesService,
    private router : Router,
    private route : ActivatedRoute,
    private clientService : ClientService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value, valid} : {value : Client , valid : boolean}) {

    if (!valid) {
      // show error message
      this.flashMsg.show("Please fill form correctly", {cssClass: 'alert-danger', timeout: 4000});
    } else {
      value.id = this.id; // add id to client
      this.clientService.updateClient(value);
      this.flashMsg.show("Client updated successfully", {cssClass: 'alert-success', timeout: 4000}); // show message
      this.router.navigate(['/client/' + this.id]); // go back to dashboard
    }
    console.log(value,valid); // this is to check whether the form can proceed thru 
                              // depending on whether it is valid or not

  }

}
