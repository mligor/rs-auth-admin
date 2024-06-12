import { Routes } from '@angular/router';

import { ClientsComponent } from './pages/clients/clients.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserPoolsComponent } from './pages/user-pools/user-pools.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'user-pools', component: UserPoolsComponent },

  { path: '**', redirectTo: '' },
];
