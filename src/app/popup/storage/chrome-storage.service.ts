import { Injectable } from '@angular/core';
import { StorageService } from './storage.service.interface';

@Injectable({
  providedIn: 'root',
})
export class ChromeStorageService implements StorageService {
  constructor() {}

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(key, (val) => resolve(val[key]));
      } catch (err) {
        reject(err);
      }
    });
  }

  set(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.set(data, () => resolve());
      } catch (err) {
        reject(err);
      }
    });
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.remove(key, () => resolve());
      } catch (err) {
        reject(err);
      }
    });
  }
}
