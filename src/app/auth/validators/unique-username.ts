import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {}

    validate = (control: FormControl) => {
        const { value: username } = control;

        return this.authService.usernameAvailable(username)
            .pipe(
                map(value => {
                    if (value.available) {
                        return null;
                    }
                }),
                catchError(err => {
                    return err.error.username ? of({ nonUniqueUsername: true }) : of({ noConnection: true });
                })
            );
    };
}
