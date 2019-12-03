import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  private internalConnectionChanged = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }

  private updateOnlineStatus() {
    this.internalConnectionChanged.next(window.navigator.onLine);
  }

  get isOnline() {
    return window.navigator.onLine;
  }
}
