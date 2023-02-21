import { createEffect, ofType, Actions } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import * as AuthActions from '../store/auth.actions';
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export const handleAuth = (expiresIn: number, email: string, localId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, localId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.Logging({
        email: email,
        userId: localId,
        token: token,
        expirationDate: expirationDate,
        redirect: true
    });
}

export const handleError = (erroResponse: HttpErrorResponse) => {
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
        return of(new AuthActions.LoginFail(errorMessage));
    }
}

@Injectable()
export class AuthEffects {
    signUpURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.apiFirebaseKey;
    signInURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.apiFirebaseKey;

    /*It always have to return and action. Otherwise we've got to add another parameter {dispatch: false}
    example: MAP return new AuthActions.Logging({*/

    authLogin = createEffect(() => this.actions$.pipe(
        //it'll only execute for this tipe of action.
        ofType(AuthActions.LOGIN_START),

        //allows us to create a new observable by taking another observable data.
        switchMap((authData: AuthActions.StartLogin) => {
            return this.http.post<AuthResponse>(this.signInURL, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                tap(data => {
                    this.authService.setLogoutTimer(+data.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                }),
                catchError(handleError))
        })));

    authSignUp = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.SIGN_UP),
        switchMap((resp: AuthActions.SignUp) => {
            return this.http.post<AuthResponse>(this.signUpURL,
                {
                    email: resp.payload.email,
                    password: resp.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(data => {
                    this.authService.setLogoutTimer(+data.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                }),
                catchError(handleError)
            )
        })
    ));

    authSuccess = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOOGIN),
        tap((data: AuthActions.Logging) => {
            
            if (data.payload.redirect) {
                this.router.navigate(['/']);
            }
        })), { dispatch: false });

    authLogout = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('userData');
            this.authService.clearTimeOut();
            this.router.navigate(['/auth']);
        })), { dispatch: false });

    authAutoLoging = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(data => {
            const userData = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                /*return null;
                We cannot return null. It's gotta be a action*/
                return { type: 'dummy' }
            }
            const userLoaded = new User(userData.email, userData.localId, userData._token, new Date(userData._tokenExpirationDate));
            if (userLoaded.token) {

                const expirationDateDuration = (new Date(userLoaded.tokenExpirationDate).getTime() - new Date().getTime());
                this.authService.setLogoutTimer((+expirationDateDuration));

                return new AuthActions.Logging({
                    email: userLoaded.email,
                    userId: userLoaded.localId,
                    token: userLoaded.token,
                    expirationDate: userLoaded.tokenExpirationDate,
                    redirect: false
                });
            }
            return { type: 'dummy' }
        })
    ));

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) { }
}