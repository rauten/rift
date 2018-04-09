import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserprofileComponent} from './userprofile/userprofile.component';
import { UsersessionsComponent } from './usersessions/usersessions.component';
import { TheriftComponent } from './therift/therift.component';
import {RiftsessionsComponent} from "./therift/riftsessions/riftsessions.component";
import {UpdateInfoComponent} from './userprofile/update-info/update-info.component';
import {SessionPageComponent} from "./therift/riftsessions/session-page/session-page.component";
import {UserRatingComponent} from "./userprofile/user-rating/user-rating.component";
import {UpdateSessionComponent} from "./therift/riftsessions/session-page/update-session/update-session.component";
import {FeedComponent} from "./feed/feed.component";

export const router: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user/:rifttag', component: UserprofileComponent,
    children: [
      {path: 'update', component: UpdateInfoComponent},
      {path: 'rate', component: UserRatingComponent}
    ]
  },
  { path: 'sessions', component: UsersessionsComponent,
  },
  { path: 'home', component: TheriftComponent,
  },
  {path: 'youtube', component: TheriftComponent},
  {path: 'twitch', component: TheriftComponent},
  { path: 'therift/:searchQuery', component: RiftsessionsComponent},
  { path: 'session/:sessionId', component: SessionPageComponent,
    children: [
      {path: 'update', component: UpdateSessionComponent}
    ]
  },
  { path: 'feed', component: FeedComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
