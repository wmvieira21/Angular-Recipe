import { Action } from "@ngrx/store";

/*Pre fixing [Auth] */
export const LOOGIN = '[Auth] LOOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';

/*Effects*/
export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';
export const SIGN_UP = '[Auth] SIGN_UP';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export class Logging implements Action {
    readonly type = LOOGIN;

    constructor(public payload: { email: string, userId: string, token: string, expirationDate: Date, redirect: boolean }) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
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

export class SignUp implements Action {
    readonly type = SIGN_UP;

    constructor(public payload: { email: string; password: string }) { }
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActionTypes = Logging | Logout | LoginFail | StartLogin | SignUp | ClearError | AutoLogin;