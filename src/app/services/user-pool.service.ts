import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ItemLoader } from '../zimco-ui-components/item-list-editor/item-list-editor.component';
import { RSAuthDBService } from './rs-auth-db.service';

export interface UserPool {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserPoolService implements ItemLoader<UserPool, UserPool> {
  private dbService = inject(RSAuthDBService);

  get items$(): Observable<UserPool[]> {
    return from(this.dbService.getUserPools()).pipe(delay(500));
  }

  item$(id: string): Observable<UserPool | null> {
    return from(this.dbService.getUserPool(id)).pipe(
      delay(500),
      map(userPool => userPool ?? null)
    );
  }

  add(userPool: UserPool): Observable<void> {
    return from(this.dbService.addUserPool(userPool));
  }

  save(userPool: UserPool): Observable<void> {
    return from(this.dbService.saveUserPool(userPool));
  }

  delete(id: string): Observable<void> {
    return from(this.dbService.deleteUserPool(id));
  }
}
