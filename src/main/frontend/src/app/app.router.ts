import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserprofileComponent} from './userprofile/userprofile.component';
import { UsersessionsComponent } from './usersessions/usersessions.component';
import { TheriftComponent } from './therift/therift.component';
import {RiftsessionsComponent} from "./therift/riftsessions/riftsessions.component";

export const router: Routes = [
  { path: '', redirectTo: '/therift', pathMatch: 'full' },
  { path: 'user/:rifttag', component: UserprofileComponent },
  { path: 'sessions', component: UsersessionsComponent },
  { path: 'therift', component: TheriftComponent },
  { path: 'riftsessions', component: RiftsessionsComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
