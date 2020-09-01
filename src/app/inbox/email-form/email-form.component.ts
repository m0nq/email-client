import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
    selector: 'cq-email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
    emailForm: FormGroup;
    @Input() email: Email;
    @Output() emailSubmit = new EventEmitter();

    constructor() {}

    ngOnInit() {
        const { subject, from, to, text } = this.email;
        this.emailForm = new FormGroup({
            to: new FormControl(to, [
                Validators.required,
                Validators.email
            ]),
            from: new FormControl({ value: from, disabled: true }, [
                Validators.required,
                Validators.email
            ]),
            subject: new FormControl(subject, [Validators.required]),
            text: new FormControl(text, [Validators.required])
        });
    }

    onSubmit() {
        if (this.emailForm.invalid) {
            return;
        }
        this.emailSubmit.emit(this.emailForm.value);
    }
}
