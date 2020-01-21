import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;

  allowRegistration: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.allowRegistration = this.settingsService.getSettings().allowRegister;
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMsg.show("Successfully logged out!", {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/']);
  } 

}
