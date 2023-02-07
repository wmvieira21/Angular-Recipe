import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
        );
    }
}