import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })

export class AuthService {

    signUpURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.apiFirebaseKey;
    signInURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.apiFirebaseKey;

    /*BehaviorSubject works as the same as a Subjet, we can use next e subscribe to it.
    Even before subscribing to the userObservable, it gives us acess to the previosily emitted user.
    */
    //userObservable = new BehaviorSubject<User>(null);
    private expirationDateTimer: any;

    constructor(private http: HttpClient, private router: Router,
        private store: Store<fromAppReducer.AppState>) { }

    signUp(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.signUpURL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleErrors), tap(data => {
            this.handleAuthtentication(data.email, data.localId, data.idToken, +data.expiresIn);
        }))
    };

    signIn(emailParam: string, passwordParam: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.signInURL, {
            email: emailParam,
            password: passwordParam,
            returnSecureToken: true
        }).pipe(catchError(this.handleErrors), tap(data => {
            this.handleAuthtentication(data.email, data.localId, data.idToken, +data.expiresIn);
        }));
    }

    handleErrors(erroResponse: HttpErrorResponse) {
        let errorMessage = '';

        if (erroResponse.error
            && erroResponse.error.error
            && erroResponse.error['error'].message) {
            switch (erroResponse.error['error'].message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email is already registered';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Email invalid';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Password invalid';
                    break;
                default:
                    errorMessage = erroResponse.error['error'].message;
                    break;
            }
            return throwError(() => new Error(errorMessage));
        }
    }
    private handleAuthtentication(email: string, localId: string, idToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
        const user = new User(email, localId, idToken, expirationDate);

        //this.userObservable.next(user);
        //NGRX
        this.store.dispatch(new fromAuthActions.Logging({ email: email, userId: localId, token: idToken, expirationDate: expirationDate }));

        this.autoLogout(expiresIn * 1000);

        /*localStorage is a API provided by the browser where we can storage simple key value pairs*/
        localStorage.setItem('userData', JSON.stringify(user));
    }

    onLogout() {
        //this.userObservable.next(null);
        //NGRX
        this.store.dispatch(new fromAuthActions.Logout());

        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if (!this.expirationDateTimer) {
            clearTimeout(this.expirationDateTimer);
        }
        this.expirationDateTimer = null;
    }

    autoLoging() {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return null;
        }
        const userLoaded = new User(userData.email, userData.localId, userData._token, new Date(userData._tokenExpirationDate));
        if (userLoaded.token) {
            //this.userObservable.next(userLoaded);
            //NGRX
            this.store.dispatch(new fromAuthActions.Logging({
                email: userLoaded.email,
                userId: userLoaded.localId, token: userLoaded.token, expirationDate: userLoaded.tokenExpirationDate
            }));

            const expirationDateDuration = (new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
            this.autoLogout(expirationDateDuration);
        } else {
            this.onLogout();
        }
    }

    autoLogout(expirationDateMiliseconds: number) {
        console.log(expirationDateMiliseconds);
        this.expirationDateTimer = setTimeout(() => {
            this.onLogout();
        }, expirationDateMiliseconds);
    }
}