import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ItemLoader } from '../zimco-ui-components/item-list-editor/item-list-editor.component';
import { RSAuthDBService } from './rs-auth-db.service';

export interface AuthClient {
  id: string;
  name: string;
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  grantTypes: string[];
  scopes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthClientService implements ItemLoader<AuthClient, AuthClient> {
  private dbService = inject(RSAuthDBService);

  get items$(): Observable<AuthClient[]> {
    return from(this.dbService.getAuthClients()).pipe(delay(500));
  }

  item$(id: string): Observable<AuthClient | null> {
    return from(this.dbService.getAuthClient(id)).pipe(
      delay(500),
      map(client => client ?? null)
    );
  }

  add(authClient: AuthClient): Observable<void> {
    return from(this.dbService.addAuthClient(authClient));
  }

  save(authClient: AuthClient): Observable<void> {
    return from(this.dbService.saveAuthClient(authClient));
  }

  delete(id: string): Observable<void> {
    return from(this.dbService.deleteAuthClient(id));
  }
}
