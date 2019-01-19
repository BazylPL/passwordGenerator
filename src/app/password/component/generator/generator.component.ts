import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Password} from '../../model/Password';
import {PasswordGeneratorService} from '../../service/password-generator.service';

@Component({
    selector: 'pg-generator',
    templateUrl: './generator.component.html',
    styles: []
})
export class GeneratorComponent implements OnInit, OnDestroy {

    @ViewChild('inputView') inputViewRef: ElementRef;
    @ViewChild('lowercaseCheck') lowercaseCheckRef: ElementRef;
    @ViewChild('uppercaseCheck') uppercaseCheckRef: ElementRef;
    @ViewChild('numbersCheck') numbersCheckRef: ElementRef;
    @ViewChild('symbolsCheck') symbolsCheckRef: ElementRef;
    @ViewChild('lengthInput') lengthInputRef: ElementRef;
    passwordSubscription: Subscription;

    constructor(private passwordGeneratorService: PasswordGeneratorService) {
    }

    ngOnInit(): void {
        this.passwordSubscription = this.passwordGeneratorService.getCurrentPassword()
            .subscribe((password: Password) => {
                this.inputViewRef.nativeElement.value = password.plain;
            });
    }

    ngOnDestroy(): void {
        this.passwordSubscription.unsubscribe();
    }

    onOptionsChange(): void {
        this.passwordGeneratorService.generatePassword(
            this.lowercaseCheckRef.nativeElement.checked,
            this.uppercaseCheckRef.nativeElement.checked,
            this.numbersCheckRef.nativeElement.checked,
            this.symbolsCheckRef.nativeElement.checked,
            Number(this.lengthInputRef.nativeElement.value)
        );
    }
}
