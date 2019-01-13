import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordGeneratorService} from './service/password-generator.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [PasswordGeneratorService]
})
export class PasswordModule {
}
