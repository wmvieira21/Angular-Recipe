import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

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
        this.authService.signUp(form.value['email'], form.value['password']).subscribe({
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