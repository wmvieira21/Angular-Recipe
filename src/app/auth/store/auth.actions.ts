import { Action } from "@ngrx/store";
import { User } from "../user.model";

/*Pre fixing [Auth] */
export const LOOGIN = '[Auth] LOOGIN';
export const LOGOUT = '[Auth] LOGOUT';

/*Effects*/
export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';

export class Logging implements Action {
    readonly type = LOOGIN;

    constructor(public payload: { email: string, userId: string, token: string, expirationDate: Date }) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

/*Effects*/
export class StartLogin implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: { email: string; password: string }) { }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string) { }
}

export type AuthActionTypes = Logging | Logout | LoginFail | StartLogin;