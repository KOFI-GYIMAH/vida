import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // * Set item in localStorage
  setItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // * Get item from localStorage
  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // * Remove item from localStorage
  removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  // * Clear localStorage
  clear() {
    return localStorage.clear();
  }
}
