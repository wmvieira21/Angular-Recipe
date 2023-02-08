import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {

    isSignUpMode = true;
    isLoading = false;
    error: string = '';
    

    constructor(private authService: AuthService) { }

    onSwitchButton() {
        this.isSignUpMode = !this.isSignUpMode;
    }

    onSubmitForm(form: NgForm) {
        this.isLoading = true;
        let authObservable: Observable<AuthResponse>;

        if (this.isSignUpMode) {
            authObservable = this.authService.signUp(form.value['email'], form.value['password']);
        } else {
            authObservable = this.authService.signIn(form.value['email'], form.value['password']);
        }

        authObservable.subscribe({
            next: (dataResponse) => {
                console.log(dataResponse);
                this.isLoading = false;
            },
            error: (erroResponse) => {
                console.log(erroResponse);
                this.error = erroResponse;
                this.isLoading = false;
            }
        });
        form.reset();
    }

    onEmailFocused() {
        this.error = '';
    }
}