import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { ItemLoader } from '../zimco-ui-components/item-list-editor/item-list-editor.component';

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
  private clients: AuthClient[] = [
    {
      id: '1',
      name: 'Client 1',
      clientId: 'client_1',
      clientSecret: 'secret_1',
      redirectUris: ['https://client1.example.com/callback'],
      grantTypes: ['authorization_code', 'refresh_token'],
      scopes: ['read', 'write'],
    },
    {
      id: '2',
      name: 'Client 2',
      clientId: 'client_2',
      clientSecret: 'secret_2',
      redirectUris: ['https://client2.example.com/callback'],
      grantTypes: ['client_credentials'],
      scopes: ['read'],
    },
    {
      id: '3',
      name: 'Client 3',
      clientId: 'client_3',
      clientSecret: 'secret_3',
      redirectUris: ['https://client3.example.com/callback'],
      grantTypes: ['password', 'refresh_token'],
      scopes: ['read', 'write', 'admin'],
    },
  ];

  get items$(): Observable<AuthClient[]> {
    return of(this.clients).pipe(delay(500));
  }

  item$(id: string): Observable<AuthClient | null> {
    return of(this.clients).pipe(
      delay(500),
      map(clients => clients.find(c => c.id === id) ?? null)
    );
  }
}
