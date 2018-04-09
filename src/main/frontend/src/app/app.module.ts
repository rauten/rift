import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from "@angular/forms";
import { routes } from './app.router';
import 'hammerjs';

import {MatTabsModule} from '@angular/material/tabs';
import {
  MatStepperModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
  MatNativeDateModule, MAT_DIALOG_DATA, MatDialog
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModalModule } from 'ngx-bootstrap';


import {Globals} from "./global/globals";
import {CreateSessionService} from "./usersessions/create-session/data/create-session.service";
import {CreateSessionComponent} from "./usersessions/create-session/create-session.component";
import {SessionTypePipe} from "./pipes/session-type.pipe";
import { SessionTimePipe } from './pipes/session-time.pipe';
import { GameFilterPipe } from './pipes/game-filter.pipe';
import { ConsoleFilterPipe } from './pipes/console-filter.pipe';

import {BsDropdownModule, AlertModule, TabsModule} from 'ngx-bootstrap';

import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import {ImageUploadModule} from "angular2-image-upload";
import { FileUploadComponent } from './components/file-upload/file-upload.component';

import { NgxBraintreeModule } from 'ngx-braintree';
import { FeedComponent } from './feed/feed.component';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import {NotificationsService} from "./userprofile/notifications.service";
import { FileAComplaintComponent } from './userprofile/file-a-complaint/file-a-complaint.component';
import {FileAComplaintService} from "./userprofile/file-a-complaint/data/file-a-complaint-service";
import { KickRifteeButtonComponent } from './components/kick-riftee-button/kick-riftee-button.component';
import {TwitchService} from './userprofile/twitch.service';
import {YoutubeService} from "./userprofile/youtube.service";
import { AddGameAccountComponent } from './userprofile/game-account/add-game-account/add-game-account.component';
import { EditGameAccountComponent } from './userprofile/game-account/edit-game-account/edit-game-account.component';
import {GameAccountService} from "./userprofile/game-account/game-account.service";
import { StripePaymentComponent } from './userprofile/stripe-payment/stripe-payment.component';
import { AddBankAccountComponent } from './userprofile/stripe-payment/legal-bank-account-info/add-bank-account/add-bank-account.component';
import {StripePaymentService} from "./userprofile/stripe-payment/stripe-payment.service";
import { LegalBankAccountInfoComponent } from './userprofile/stripe-payment/legal-bank-account-info/legal-bank-account-info.component';
import { ViewCardsComponent } from './userprofile/stripe-payment/view-cards/view-cards.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import {SharedFunctions} from "./shared/shared-functions";

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
    CreateSessionComponent,
    CalendarComponent,

    CapitalizePipe,
    SessionTypePipe,
    SessionTimePipe,
    GameFilterPipe,
    ConsoleFilterPipe,
    FileUploadComponent,
    FeedComponent,
    FeedCardComponent,
    FileAComplaintComponent,
    KickRifteeButtonComponent,
    AddGameAccountComponent,
    EditGameAccountComponent,
    StripePaymentComponent,
    AddBankAccountComponent,
    LegalBankAccountInfoComponent,
    ViewCardsComponent,
    CreditCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
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
    MatCheckboxModule,
    NgxBraintreeModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ImageUploadModule.forRoot(),
  ],
  exports: [
    FileUploadComponent
  ],
  entryComponents: [SessionPageComponent, UpdateSessionComponent, UsersessionsComponent, CreateSessionComponent,
  UserprofileComponent, UpdateInfoComponent, UserRatingComponent, FileAComplaintComponent, AddGameAccountComponent,
  EditGameAccountComponent, StripePaymentComponent, AddBankAccountComponent, LegalBankAccountInfoComponent,
  ViewCardsComponent],
  providers: [UserprofileService, UsersessionsService, AuthService, UpdateInfoService, SearchBarService, SessionPageService,
    UserRatingService, UpdateSessionService, CreateSessionService, NotificationsService, FileAComplaintService,
    YoutubeService, TwitchService, GameAccountService, StripePaymentService, SharedFunctions,
    {provide: FormDataService, useClass: FormDataService},
    {provide: WorkflowService, useClass: WorkflowService},
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
