import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface UserPool {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserPoolService {
  private userPools: UserPool[] = [
    { id: '1', name: 'User Pool 1' },
    { id: '2', name: 'User Pool 2' },
    { id: '3', name: 'User Pool 3' },
  ];

  getUserPools(): Observable<UserPool[]> {
    return of(this.userPools).pipe(delay(500));
  }
}
