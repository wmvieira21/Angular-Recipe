import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expireIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })

export class AuthService {

    signInURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCESnKP81cPyXVKCbbeRSbZxrX-73J3jYU";

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.signInURL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError((erroResponse) => {
            let errorMessage = '';

            if (erroResponse.error
                && erroResponse.error.error
                && erroResponse.error['error'].message) {
                switch (erroResponse.error['error'].message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email is already registered';
                        break;
                    default:
                        errorMessage = erroResponse.error['error'].message;
                        break;
                }
                return throwError(() => new Error(errorMessage));
            }
        }));
    }
}