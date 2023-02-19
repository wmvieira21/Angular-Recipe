import { NgFor } from "@angular/common";
import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subject, Subscription } from "rxjs";
import { AlertBox } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit, OnDestroy {

    isSignUpMode = true;
    isLoading = false;
    error: string = '';

    /*Alternative way
    ViewChild, we can pass the name of a local reference in the DOM (#nameofelement), or the type of directive.
    In this case we're passing the newly created directive PlaceHolderDirective.
    ViweChild will search for this directive and return the first element that it finds.*/
    @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
    closeSubscription: Subscription;


    constructor(private authService: AuthService, private router: Router, private componentFactoryRessolver: ComponentFactoryResolver,
        private store: Store<fromAppReducer.AppState>) { }

    ngOnInit(): void {
        this.store.select('auth').subscribe(authStare => {
            this.isLoading = authStare.isLoadingAuth;
            this.error = authStare.loginError;
        });
    }

    onSwitchButton() {
        this.isSignUpMode = !this.isSignUpMode;
    }

    /* onSubmitForm(form: NgForm) {
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
                 this.router.navigate(['recipes']);
             },
             error: (erroResponse) => {
                 console.log(erroResponse);
                 this.error = erroResponse;
                 this.isLoading = false;
                 //Alternative way
                 //this.showErrorAlert(erroResponse);
                 
             }
         });
         form.reset();
     }*/

    //NGRX
    onSubmitForm(form: NgForm) {
        if (this.isSignUpMode) {
            //authObservable = this.authService.signUp(form.value['email'], form.value['password']);
            this.store.dispatch(new fromAuthActions.SignUp({ email: form.value['email'], password: form.value['password'] }));

        } else {
            //authObservable = this.authService.signIn(form.value['email'], form.value['password']);
            this.store.dispatch(new fromAuthActions.StartLogin({ email: form.value['email'], password: form.value['password'] }))
        }
        form.reset();
    }

    onEmailFocused() {
        this.error = '';
    }
    onHandlingErrorAlert() {
        this.store.dispatch(new fromAuthActions.ClearError());
    }

    /*Alternative way to show an alertbox message.
    **The best way still is the follwing: 
    <app-alert [message]="error" *ngIf="error" (closeEventEmitter)="onHandlingErrorAlert()"></app-alert>*/

    showErrorAlert(error: string) {
        const alertComponentFactory = this.componentFactoryRessolver.resolveComponentFactory(AlertBox);

        const viewContainerRef = this.alertHost.viewContainerRef;
        viewContainerRef.clear;
        const componentRef = viewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = error;

        this.closeSubscription = componentRef.instance.closeEventEmitter.subscribe(() => {
            this.closeSubscription.unsubscribe();
            viewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
    }
}