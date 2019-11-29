import { Injectable } from '@angular/core';
import { openDB } from 'idb';

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

  getId() {
    // creating a genuine GUID in javascript is kind of a bizarre thing,
    // I'm using a simple timestamp for this demo.
    return new Date().getTime();
  }

  idbContext() {
    /*return openDB(this.dbName, this.dbVersion, {  
      upgrade(db, oldVersion, newVersion, transaction) {
          db.createObjectStore(this.dbTableName,{ keyPath: 'userId' });
      }
    });*/
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
    // in case the sync method fails, this method will be
    // invoked again. to prevent duplications of the very same object in localDb,
    // we add a custom property (clientId), and simply return before save
    /*if (body.hasOwnProperty('clientId')) {
      console.log('this item is already in indexedDb');
      return;
    }

    if (body.hasOwnProperty('description')) {
      body['description'] = `${body['description']} (auto-sync)`;
    }*/
    const customId = this.getId();
    //body.clientId = customId;
    const obj = {
      userId: body.body.userId,
      body: body.body.body,
      title: body.body.title
    };

    const db = await this.idbContext();
    await db.add( 'failedRequestsTable' , obj);
  }

  async getAll() {
    const db = await this.idbContext();
    return db.transaction(this.dbTableName, 'readonly').objectStore(this.dbTableName).getAll();
  }

  async delete(clientId: string) {
    const db = await this.idbContext();
    const tx = db.transaction(this.dbTableName, 'readwrite');
    tx.objectStore(this.dbTableName).delete(clientId);
    return tx.done;
  }

}
