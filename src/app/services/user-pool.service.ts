import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { ItemLoader } from '../zimco-ui-components/item-list-editor/item-list-editor.component';

export interface UserPool {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserPoolService implements ItemLoader<UserPool, UserPool> {
  private userPools: UserPool[] = [
    { id: '1', name: 'User Pool 1' },
    { id: '2', name: 'User Pool 2' },
    { id: '3', name: 'User Pool 3' },
  ];

  get items$(): Observable<UserPool[]> {
    return of(this.userPools).pipe(delay(500));
  }

  item$(id: string): Observable<UserPool | null> {
    return of(this.userPools).pipe(
      delay(500),
      map(pools => pools.find(pool => pool.id === id) ?? null)
    );
  }
}
