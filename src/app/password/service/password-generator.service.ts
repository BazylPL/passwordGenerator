import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Password} from '../model/Password';

@Injectable({
    providedIn: 'root'
})
export class PasswordGeneratorService {

    private _currentPassword$ = new BehaviorSubject<Password>(new Password(''));

    constructor() {
    }

    public generatePassword(lowercase: boolean, uppercase: boolean, numbers: boolean, symbols: boolean, chars: number): void {

        const fakeString = Math.random().toString(36); // fake, to be changed
        const newPassword = new Password(fakeString);

        this._currentPassword$.next(newPassword);
    }
}
