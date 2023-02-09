import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

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

    signUpURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCESnKP81cPyXVKCbbeRSbZxrX-73J3jYU";
    signInURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCESnKP81cPyXVKCbbeRSbZxrX-73J3jYU";

    /*BehaviorSubject works as the same as a Subjet, we can use next e subscribe to it.
    Even before subscribing to the userObservable, it gives us acess to the previosily emitted user.
    */
    userObservable = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) { }

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
        this.userObservable.next(user);
    }
}