import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.css']
})
export class AddClientFormComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true;

  @ViewChild('clientForm', {static: false}) form: any;

  constructor(private flashMsg : FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit({value, valid} : {value : Client , valid : boolean}) {
    if (this.disableBalanceOnAdd) { // if we're disabling a field on the form 
      value.balance = 0; // this is just setting the actual balance value 
                        // of a Client to 0, because it actually isn't
    }

    if (!valid) {
      // show error message
      this.flashMsg.show("Please fill form correctly", {cssClass: 'alert-danger', timeout: 4000});
    } else {
      // add client
      // show message
      this.flashMsg.show("Client added successfully", {cssClass: 'alert-success', timeout: 4000});
      // go back to dashboard
    }
    console.log(value,valid); // this is to check whether the form can proceed thru 
                              // depending on whether it is valid or not

  }

}
