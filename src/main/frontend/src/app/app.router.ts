import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserprofileComponent} from './userprofile/userprofile.component';
import { UsersessionsComponent } from './usersessions/usersessions.component';
import { TheriftComponent } from './therift/therift.component';
import {RiftsessionsComponent} from "./therift/riftsessions/riftsessions.component";
import {SessionformComponent} from "./usersessions/sessionform/sessionform.component";
import {UpdateInfoComponent} from './userprofile/update-info/update-info.component';

export const router: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user/:rifttag', component: UserprofileComponent,
    children: [
      {path: 'update', component: UpdateInfoComponent}
    ]
  },
  { path: 'sessions', component: UsersessionsComponent,
    children: [
      {path: 'create', component: SessionformComponent}
    ]
  },
  { path: 'home', component: TheriftComponent,
  },
  { path: 'therift/:searchQuery', component: RiftsessionsComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
