import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UsernameAvailableResponse {
    available: boolean;
}

interface SignupResponse {
    username: string;
}

interface SignupCredentials {
    username: string;
    password: string;
    passwordConfirmation: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = 'https://api.angular-email.com/auth';

    constructor(private http: HttpClient) {}

    usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
        return this.http.post<UsernameAvailableResponse>(`${this.url}/username`, {
                username
            }
        );
    }

    signup(credentials: SignupCredentials): Observable<SignupResponse> {
        return this.http.post<SignupResponse>(`${this.url}/signup`, credentials);
    }
}
