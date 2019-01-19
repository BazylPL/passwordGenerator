import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordGeneratorService} from './service/password-generator.service';
import {GeneratorComponent} from './component/generator/generator.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [GeneratorComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [GeneratorComponent],
    providers: [PasswordGeneratorService]
})
export class PasswordModule {
}
