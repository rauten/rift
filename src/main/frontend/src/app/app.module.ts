import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { routes } from './app.router';
import 'hammerjs';


import {MatTabsModule} from '@angular/material/tabs';
import {
  MatStepperModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
  MatNativeDateModule, MAT_DIALOG_DATA
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { UserprofileComponent } from './userprofile/userprofile.component'

import { UserprofileService } from './userprofile/userprofile.service';
import { UsersessionsService} from './usersessions/usersessions.service';

import { NavbarComponent } from './navbar/navbar.component';
import { UsersessionsComponent } from './usersessions/usersessions.component';

import { TheriftComponent } from './therift/therift.component';
import { RiftsessionsComponent } from './therift/riftsessions/riftsessions.component';
import { SessionCardComponent } from './components/session-card/session-card.component';
import { AuthService } from "./auth/auth.service";
import { CapitalizePipe } from "./pipes/capitalize.pipe";

import { SessionformComponent } from './usersessions/sessionform/sessionform.component';
import { FormnavComponent } from './usersessions/sessionform/formnav/formnav.component';
import { Step1Component } from './usersessions/sessionform/step1/step1.component';
import { Step2Component } from './usersessions/sessionform/step2/step2.component';
import { Step3Component } from './usersessions/sessionform/step3/step3.component';
import { ResultComponent } from './usersessions/sessionform/result/result.component';
import { FormDataService } from "./usersessions/sessionform/data/formData.service";
import { WorkflowService } from "./usersessions/sessionform/workflow/workflow.service";
import { FormWizardModule } from "angular2-wizard/dist";
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { UpdateInfoComponent } from './userprofile/update-info/update-info.component';
import { UpdateInfoService } from "./userprofile/update-info/data/update-info.service";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarService } from "./components/search-bar/search-bar.service";
import { UserCardComponent } from './components/user-card/user-card.component';
import {
  SessionPageComponent,
  DialogContentExampleDialog
} from './therift/riftsessions/session-page/session-page.component';
import { SessionPageService } from "./therift/riftsessions/session-page/session-page.service";
import { UserRatingComponent } from './userprofile/user-rating/user-rating.component';
import { UserRatingService } from "./userprofile/user-rating/data/user-rating.service";
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { UserReviewComponent } from './components/user-review/user-review.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CalendarModule } from 'angular-calendar';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from './components/rating/rating.component';
import { UpdateSessionComponent } from './therift/riftsessions/session-page/update-session/update-session.component';
import { UpdateSessionService } from "./therift/riftsessions/session-page/update-session/data/update-session.service";
import { SessionAcceptRejectButtonComponent } from './components/session-accept-reject-button/session-accept-reject-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import {Globals} from "./global/globals";


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
    SessionPageComponent,
    UserRatingComponent,
    UserReviewComponent,
    NotificationComponent,
    RatingComponent,
    UpdateSessionComponent,
    SessionAcceptRejectButtonComponent,
    DialogContentExampleDialog
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    FormWizardModule,
    MatSelectModule,
    MatSliderModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
  ],
  entryComponents: [SessionPageComponent, UpdateSessionComponent],
  providers: [UserprofileService, UsersessionsService, AuthService, UpdateInfoService, SearchBarService, SessionPageService,
    UserRatingService, UpdateSessionService,
    {provide: FormDataService, useClass: FormDataService},
    {provide: WorkflowService, useClass: WorkflowService},
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
