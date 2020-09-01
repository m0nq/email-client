import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
    selector: 'cq-email-reply',
    templateUrl: './email-reply.component.html',
    styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges {
    showModal = false;
    @Input() email: Email;

    constructor(private emailService: EmailService) { }

    ngOnChanges() {
        const text = this.email.text.replace(/\n/gi, '>');
        this.email = {
            ...this.email,
            from: this.email.to,
            to: this.email.from,
            subject: `RE: ${this.email.subject}`,
            text: `\n\n\n------------- ${this.email.from} wrote:\n>${text}`
        };
    }

    public onSubmit(email: Email): void {
        this.emailService.sendEmail(email)
            .subscribe(() => this.showModal = false);
    }
}
