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

interface SignedinResponse {
    authenticated: boolean;
    username: string;
}

interface SigninCredentials {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    rootUrl = 'https://api.angular-email.com/auth';
    signedIn$ = new BehaviorSubject(null);

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
                tap(() => {
                    this.signedIn$.next(true);
                })
            );
    }

    checkAuth() {
        return this.http.get<SignedinResponse>(`${this.rootUrl}/signedin`)
            .pipe(
                tap(({ authenticated }) => {
                    this.signedIn$.next(authenticated);
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

    signIn(credentials: SigninCredentials) {
        return this.http.post(`${this.rootUrl}/signin`, credentials).pipe(
            tap(() => {
                this.signedIn$.next(true);
            })
        );
    }
}
