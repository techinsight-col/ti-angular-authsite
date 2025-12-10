import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
    id: string;
    email: string;
    name?: string;
    provider?: 'email' | 'google' | 'azure' | 'cognito';
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    login(email: string, password: string): Observable<User> {
        // Mock implementation - in a real app this would call your API (Azure AD / Cognito)
        console.log(`Attempting login for ${email}`);
        return of({
            id: '123',
            email: email,
            provider: 'email' as const,
            name: 'Test User'
        }).pipe(delay(1000)); // Simulate network delay
    }

    loginWithGoogle(): Observable<User> {
        // Mock implementation for Google Sign-In
        console.log('Attempting Google login');
        return of({
            id: '456',
            email: 'user@gmail.com',
            provider: 'google' as const,
            name: 'Google User'
        }).pipe(delay(1000));
    }

    register(email: string, password: string): Observable<User> {
        // Mock implementation for registration
        console.log(`Attempting registration for ${email}`);
        return of({
            id: '789',
            email: email,
            provider: 'email' as const,
            name: 'New User'
        }).pipe(delay(1000));
    }
}
