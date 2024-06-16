import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { AuthClient } from './auth-client.service';
import { UserPool } from './user-pool.service';

export interface RSAuthDB extends DBSchema {
  userPools: {
    key: string;
    value: UserPool;
  };
  clients: {
    key: string;
    value: AuthClient;
  };
}

@Injectable({
  providedIn: 'root',
})
export class RSAuthDBService {
  private dbPromise: Promise<IDBPDatabase<RSAuthDB>>;

  constructor() {
    this.dbPromise = openDB<RSAuthDB>('rs-auth-db', 1, {
      upgrade(db) {
        db.createObjectStore('userPools', { keyPath: 'id' });
        db.createObjectStore('clients', { keyPath: 'id' });
      },
    });
  }

  async addUserPool(userPool: UserPool): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('userPools', 'readwrite');
    await tx.store.add(userPool);
    await tx.done;
  }

  async saveUserPool(userPool: UserPool): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('userPools', 'readwrite');
    await tx.store.put(userPool);
    await tx.done;
  }

  async deleteUserPool(id: string): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('userPools', 'readwrite');
    await tx.store.delete(id);
    await tx.done;
  }

  async getUserPools(): Promise<UserPool[]> {
    const db = await this.dbPromise;
    const tx = db.transaction('userPools', 'readonly');
    const userPools = await tx.store.getAll();
    await tx.done;
    return userPools;
  }

  async getUserPool(id: string): Promise<UserPool | undefined> {
    const db = await this.dbPromise;
    const tx = db.transaction('userPools', 'readonly');
    const userPool = await tx.store.get(id);
    await tx.done;
    return userPool;
  }

  async addAuthClient(authClient: AuthClient): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('clients', 'readwrite');
    await tx.store.add(authClient);
    await tx.done;
  }

  async saveAuthClient(authClient: AuthClient): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('clients', 'readwrite');
    await tx.store.put(authClient);
    await tx.done;
  }

  async deleteAuthClient(id: string): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('clients', 'readwrite');
    await tx.store.delete(id);
    await tx.done;
  }

  async getAuthClients(): Promise<AuthClient[]> {
    const db = await this.dbPromise;
    const tx = db.transaction('clients', 'readonly');
    const clients = await tx.store.getAll();
    await tx.done;
    return clients;
  }

  async getAuthClient(id: string): Promise<AuthClient | undefined> {
    const db = await this.dbPromise;
    const tx = db.transaction('clients', 'readonly');
    const client = await tx.store.get(id);
    await tx.done;
    return client;
  }
}
