import { Routes } from '@angular/router';

import { ClientsComponent } from './pages/clients/clients.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserPoolsComponent } from './pages/user-pools/user-pools.page';
import { ZimCoTestPageComponent } from './zimco-ui-components/test/test-page.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'user-pools', component: UserPoolsComponent },

  // Test Page for UI Controls
  { path: 'zimco-ui-components', component: ZimCoTestPageComponent },

  { path: '**', redirectTo: '' },
];
