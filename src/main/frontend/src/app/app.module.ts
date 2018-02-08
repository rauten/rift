import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { routes } from './app.router';

import {MatTabsModule} from '@angular/material/tabs';
import {
  MatStepperModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { UserprofileComponent } from './userprofile/userprofile.component'

import { UserprofileService } from './userprofile/userprofile.service';
import { UsersessionsService} from './usersessions/usersessions.service';

import { NavbarComponent } from './navbar/navbar.component';
import { UsersessionsComponent } from './usersessions/usersessions.component';

import { TheriftComponent } from './therift/therift.component';
import { RiftsessionsComponent } from './therift/riftsessions/riftsessions.component';
import { SessionCardComponent } from './components/session-card/session-card.component';
import {AuthService} from "./auth/auth.service";
import {CapitalizePipe} from "./pipes/capitalize.pipe";

import { SessionformComponent } from './usersessions/sessionform/sessionform.component';
import { FormnavComponent } from './usersessions/sessionform/formnav/formnav.component';
import { Step1Component } from './usersessions/sessionform/step1/step1.component';
import { Step2Component } from './usersessions/sessionform/step2/step2.component';
import { Step3Component } from './usersessions/sessionform/step3/step3.component';
import { ResultComponent } from './usersessions/sessionform/result/result.component';
import {FormDataService} from "./usersessions/sessionform/data/formData.service";
import {WorkflowService} from "./usersessions/sessionform/workflow/workflow.service";
import {FormWizardModule} from "angular2-wizard/dist";
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { UpdateInfoComponent } from './userprofile/update-info/update-info.component';
import {UpdateInfoService} from "./userprofile/update-info/data/update-info.service";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {SearchBarService} from "./components/search-bar/search-bar.service";
import { UserCardComponent } from './components/user-card/user-card.component';
import { SessionPageComponent } from './therift/riftsessions/session-page/session-page.component';
import {SessionPageService} from "./therift/riftsessions/session-page/session-page.service";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    NavbarComponent,
    UsersessionsComponent,
    TheriftComponent,
    RiftsessionsComponent,
    SessionCardComponent,
    CapitalizePipe,
    SessionformComponent,
    FormnavComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ResultComponent,
    FollowButtonComponent,
    UpdateInfoComponent,
    SearchBarComponent,
    UserCardComponent,
    SessionPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routes,
    FormsModule,
    MatTabsModule,
    MatStepperModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormWizardModule
  ],
  providers: [UserprofileService, UsersessionsService, AuthService, UpdateInfoService, SearchBarService, SessionPageService,
    {provide: FormDataService, useClass: FormDataService},
    {provide: WorkflowService, useClass: WorkflowService},
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
