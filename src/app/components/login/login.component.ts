import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // has form with ngModel to email and password so...
  email: string;
  password: string;

  constructor(
    private authService : AuthService,
    private flashMsg : FlashMessagesService,
    private router : Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) { // authorised, so logged in
        this.router.navigate(['/']);
      }
    })
  }

  onSubmit() {
    console.log(this.email + " , " + this.password);
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
      .then( res => {
        this.flashMsg.show("You have successfully logged in", {
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
