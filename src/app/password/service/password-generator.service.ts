import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Password} from '../model/Password';

@Injectable({
    providedIn: 'root'
})
export class PasswordGeneratorService {

    private currentPassword$ = new BehaviorSubject<Password>(new Password(''));

    constructor() {
    }
}
