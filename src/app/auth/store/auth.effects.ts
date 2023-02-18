import { createEffect, ofType, Actions } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import * as AuthActions from '../store/auth.actions';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
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
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
                    return new AuthActions.Logging({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    });
                }),
                catchError(error => {
                    return of();
                }))
        })));

    constructor(private actions$: Actions, private http: HttpClient) { }
}