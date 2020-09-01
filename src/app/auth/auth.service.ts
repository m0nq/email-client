import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
    available: boolean;
}

interface SignupCredentials {
    username: string;
    password: string;
    passwordConfirmation: string;
}

interface SignupResponse {
    username: string;
}

interface SignedInResponse {
    authenticated: boolean;
    username: string;
}

interface SignInCredentials {
    username: string;
    password: string;
}

interface SignInResponse {
    username: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    rootUrl = 'https://api.angular-email.com/auth';
    signedIn$ = new BehaviorSubject(null);
    username = '';

    constructor(private http: HttpClient) {}

    usernameAvailable(username: string) {
        return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/username`,
            {
                username
            }
        );
    }

    signup(credentials: SignupCredentials) {
        return this.http.post<SignupResponse>(`${this.rootUrl}/signup`, credentials)
            .pipe(
                tap(({ username }) => {
                    this.signedIn$.next(true);
                    this.username = username;
                })
            );
    }

    checkAuth() {
        return this.http.get<SignedInResponse>(`${this.rootUrl}/signedin`)
            .pipe(
                tap(({ authenticated, username }) => {
                    this.signedIn$.next(authenticated);
                    this.username = username;
                })
            );
    }

    signOut() {
        return this.http.post(`${this.rootUrl}/signout`, {})
            .pipe(
                tap(() => {
                    this.signedIn$.next(false);
                })
            );
    }

    signIn(credentials: SignInCredentials) {
        return this.http.post<SignedInResponse>(`${this.rootUrl}/signin`, credentials)
            .pipe(
                tap(({ username }) => {
                    this.signedIn$.next(true);
                    this.username = username;
                })
            );
    }
}
