import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Password} from '../../model/Password';
import {PasswordGeneratorService} from '../../service/password-generator.service';

@Component({
    selector: 'pg-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit, OnDestroy {

    password: Password;
    passwordSubscription: Subscription;

    // options with default values
    lowercase: boolean = true;
    uppercase: boolean = true;
    numbers: boolean = true;
    symbols: boolean = true;
    length: number = 30;
    lengthMin: number = 3;
    lengthMax: number = 60;
    lengthStep: number = 1;

    constructor(private passwordGeneratorService: PasswordGeneratorService) {
    }

    ngOnInit(): void {
        // subscribe on Observable<Password>
        this.passwordSubscription = this.passwordGeneratorService.getCurrentPassword()
            .subscribe((password: Password) => {
                this.password = password;
            });

        // trigger change to generate first Password
        this.onOptionsChange();
    }

    ngOnDestroy(): void {
        this.passwordSubscription.unsubscribe();
    }

    onOptionsChange($event?: Event): void {
        this.passwordGeneratorService.generatePassword(
            this.lowercase,
            this.uppercase,
            this.numbers,
            this.symbols,
            Number(this.length)
        );
    }

    onPasswordCopy(inputView: HTMLInputElement): void {
        inputView.select();
        document.execCommand('copy');
    }
}
