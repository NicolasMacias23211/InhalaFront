import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

    setDocument(document: number){
        sessionStorage.setItem('document',document.toString());
    }

    setItem(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getItem<T>(key: string): T | null {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
    }

    removeItem(key: string): void {
        sessionStorage.removeItem(key);
    }

    clear(): void {
        sessionStorage.clear();
    }

    isLoggedIn(): boolean {
        return this.getItem<boolean>('isLoggedIn') === true;
    }

    isAdmin(): boolean {
        return this.getItem<boolean>('isAdmin') === true;
    }

    setIsAdmin(isAdmin: boolean): void {
        this.setItem('isAdmin', isAdmin);
    }
}
