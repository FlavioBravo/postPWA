import { Injectable } from '@angular/core';
import { openDB, IDBPTransaction } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class DbContextService {
  dbName = 'pwademo-indexed-db';
  dbTableName = 'failedRequestsTable';
  dbVersion = 1;

  constructor() {
    if (!('indexedDB' in window)) {
      throw new Error('This browser doesn\'t support IndexedDB');
    }
  }

  idbContext() {
    return openDB(this.dbName, this.dbVersion, {
      upgrade(db) {
        db.createObjectStore('failedRequestsTable', {
          // The 'id' property of the object will be the key.
          keyPath: 'userId',
        // If it isn't explicitly set, create a value by auto incrementing.
        //autoIncrement: true,
        });
      },
    });
  }

  async saveRequest(url: string, method: string, body: any) {
    const obj = {
      userId: body.body.userId,
      body: body.body.body,
      title: body.body.title
    };

    const db = await this.idbContext();
    return await db.add( 'failedRequestsTable' , obj);
  }

  async delete(userId: number) {
    const db = await this.idbContext();
    return await db.delete('failedRequestsTable', userId);
  }

  async getAll() {
    const db = await this.idbContext();
    return await db.getAll("failedRequestsTable");

  }

}
