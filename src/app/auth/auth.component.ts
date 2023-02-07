import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {

    isSignUpMode = true;

    onSwitchButton() {
        this.isSignUpMode = !this.isSignUpMode;
    }

    onSubmitForm(form: NgForm) {
        console.log(form.value);
        form.reset();
    }
}