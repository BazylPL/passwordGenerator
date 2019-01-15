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

    /**
     * @param min minimum integer value
     * @param max maximum integer value
     */
    static getRandInt(min: number, max: number): number {
        let minVal = Math.ceil(min);
        let maxVal = Math.floor(max);

        return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    }

    static shuffleArray(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    /**
     * @return Observable<Password>
     */
    public getCurrentPassword(): Observable<Password> {
        return this._currentPassword$.asObservable();
    }

    /**
     * @param lowercase should use lowercase
     * @param uppercase should use uppercase
     * @param numbers should use numbers
     * @param symbols should use symbols
     * @param chars number of chars
     */
    public generatePassword(lowercase: boolean, uppercase: boolean, numbers: boolean, symbols: boolean, chars: number): void {

        const lowercaseSet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const uppercaseSet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const numberSet: string[] = '0123456789'.split('');
        const symbolSet: string[] = '!@#$%^&*()[]{}<>?'.split('');

        let charSet: string[] = [];
        let passwordSet: string[] = [];

        if (lowercase) charSet.push(...lowercaseSet);
        if (uppercase) charSet.push(...uppercaseSet);
        if (numbers) charSet.push(...numberSet);
        if (symbols) charSet.push(...symbolSet);

        // if (0 === charSet.length) {
        //  throw some exception
        // }

        // shuffle available charSet
        charSet = PasswordGeneratorService.shuffleArray(charSet);

        // get random chars
        for (let i = 0; i < chars; i++) {
            passwordSet.push(charSet[PasswordGeneratorService.getRandInt(0, charSet.length - 1)]);
        }

        // shuffle password
        passwordSet = PasswordGeneratorService.shuffleArray(passwordSet);

        this._currentPassword$.next(new Password(passwordSet.join('')));
    }


}
