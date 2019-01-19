import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordGeneratorService} from './service/password-generator.service';
import {GeneratorComponent} from './component/generator/generator.component';

@NgModule({
    declarations: [GeneratorComponent],
    imports: [
        CommonModule
    ],
    exports: [GeneratorComponent],
    providers: [PasswordGeneratorService]
})
export class PasswordModule {
}
