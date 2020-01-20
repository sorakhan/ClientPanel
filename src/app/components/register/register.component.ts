import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService : AuthService,
    private flashMsg : FlashMessagesService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.email && this.password) {
      this.authService.register(this.email, this.password)
      .then( res => {
        this.flashMsg.show("You have successfully registed and logged in", {
          cssClass : 'alert-success', timeout: 3000
        });
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.flashMsg.show(err.message, {
          cssClass : 'alert-danger', timeout: 3000
        });
      });
    }
  }

}
