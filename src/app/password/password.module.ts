import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordGeneratorService} from './service/password-generator.service';
import { InputViewComponent } from './component/input-view/input-view.component';

@NgModule({
    declarations: [InputViewComponent],
    imports: [
        CommonModule
    ],
    exports: [InputViewComponent],
    providers: [PasswordGeneratorService]
})
export class PasswordModule {
}
