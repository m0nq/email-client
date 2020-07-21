import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'cq-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    authForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        passwordConfirmation: new FormControl('')
    });

    constructor() { }

    ngOnInit(): void {
    }
}
