import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {FormsModule} from "@angular/forms";
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { UserprofileComponent } from './userprofile/userprofile.component'

import { UserprofileService } from './userprofile/userprofile.service';
import { UsersessionsService} from './usersessions/usersessions.service';

import { NavbarComponent } from './navbar/navbar.component';
import { UsersessionsComponent } from './usersessions/usersessions.component';

import { TheriftComponent } from './therift/therift.component';
import { RiftsessionsComponent } from './therift/riftsessions/riftsessions.component';
import { SessionCardComponent } from './usersessions/models/session-card/session-card.component';
import {AuthService} from "./auth/auth.service";
import {CapitalizePipe} from "./pipes/capitalize.pipe";

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    NavbarComponent,
    UsersessionsComponent,
    TheriftComponent,
    RiftsessionsComponent,
    SessionCardComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routes,
    FormsModule,
  ],
  providers: [UserprofileService, UsersessionsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
