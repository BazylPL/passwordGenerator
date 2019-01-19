import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Password} from '../../model/Password';
import {PasswordGeneratorService} from '../../service/password-generator.service';

@Component({
    selector: 'pg-generator',
    templateUrl: './generator.component.html',
    styles: []
})
export class GeneratorComponent implements OnInit, OnDestroy {

    // options with default values
    lowercase: boolean = true;
    uppercase: boolean = true;
    numbers: boolean = true;
    symbols: boolean = false;
    length: number = 20;

    passwordSubscription: Subscription;
    @ViewChild('inputView') inputViewRef: ElementRef;

    constructor(private passwordGeneratorService: PasswordGeneratorService) {
    }

    ngOnInit(): void {

        // subscribe on Observable<Password>
        this.passwordSubscription = this.passwordGeneratorService.getCurrentPassword()
            .subscribe((password: Password) => {
                this.inputViewRef.nativeElement.value = password.plain;

                console.log(password); // TODO remove for production
            });

        // trigger change to generate first Password
        this.onOptionsChange();
    }

    ngOnDestroy(): void {
        this.passwordSubscription.unsubscribe();
    }

    onOptionsChange(): void {
        this.passwordGeneratorService.generatePassword(
            this.lowercase,
            this.uppercase,
            this.numbers,
            this.symbols,
            Number(this.length)
        );
    }
}
