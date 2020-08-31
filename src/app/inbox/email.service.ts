import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';

interface EmailSummary {
    id: string;
    subject: string;
    from: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    rootUrl = 'https://api.angular-email.com/emails';

    constructor(private http: HttpClient) {}

    getEmails() {
        return this.http.get<EmailSummary[]>(`${this.rootUrl}`);
    }

    getEmail(id: string) {
        return this.http.get<Email>(`${this.rootUrl}/${id}`);
    }
}
