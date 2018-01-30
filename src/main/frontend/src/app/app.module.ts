import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { UserprofileComponent } from './userprofile/userprofile.component'

import { UserprofileService } from './userprofile/userprofile.service';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersessionsComponent } from './usersessions/usersessions.component';

import { CalendarModule } from 'angular-calendar';
import { TheriftComponent } from './therift/therift.component';
import { RiftsessionsComponent } from './therift/riftsessions/riftsessions.component';

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    NavbarComponent,
    UsersessionsComponent,
    TheriftComponent,
    RiftsessionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routes,
    CalendarModule.forRoot(),
  ],
  providers: [UserprofileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
