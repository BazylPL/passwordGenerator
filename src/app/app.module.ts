import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PasswordModule} from './password/password.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PasswordModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
