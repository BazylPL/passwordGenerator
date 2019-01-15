import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Password} from '../model/Password';

@Injectable({
    providedIn: 'root'
})
export class PasswordGeneratorService {

    private _currentPassword$ = new BehaviorSubject<Password>(new Password(''));

    constructor() {
    }

    public generatePassword(lowercase: boolean, uppercase: boolean, numbers: boolean, symbols: boolean, chars: number): void {

        const lowercaseSet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const uppercaseSet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const numberSet: string[] = '0123456789'.split('');
        const symbolSet: string[] = '!@#$%^&*()[]{}<>?'.split('');
        let charSet: string[] = [];

        if (lowercase) charSet.push(...lowercaseSet);
        if (uppercase) charSet.push(...uppercaseSet);
        if (numbers) charSet.push(...numberSet);
        if (symbols) charSet.push(...symbolSet);

        if (0 === charSet.length) {
            // TODO throw some exception
        }

        let passwordSet: string[] = [];
        for (let i = 0; i < chars; i++) {
            passwordSet.push(charSet[this.getRandInt(0, charSet.length - 1)]);
        }

        // TODO check if at least one required character is present

        this._currentPassword$.next(new Password(passwordSet.join('')));
    }

    public getCurrentPassword(): Observable<Password> {
        return this._currentPassword$.asObservable();
    }


    private getRandInt(min: number, max: number): number {
        let minVal = Math.ceil(min);
        let maxVal = Math.floor(max);

        return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    }
}
