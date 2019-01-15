import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Password} from '../../model/Password';
import {PasswordGeneratorService} from '../../service/password-generator.service';

@Component({
    selector: 'pg-input-view',
    templateUrl: './input-view.component.html',
    styles: []
})
export class InputViewComponent implements OnInit, OnDestroy {

    @ViewChild('inputView') inputViewRef: ElementRef;
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

    // test method
    testGeneratePassword() {
        this.passwordGeneratorService.generatePassword(true, true, true, true, 25);
    }

}
