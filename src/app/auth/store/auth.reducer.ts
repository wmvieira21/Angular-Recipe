import { User } from "../user.model";
import * as FromAuthActions from "./auth.actions";

export interface StateModel {
  user: User;
  loginError: string;
  isLoadingAuth: boolean;
}

const initialState: StateModel = {
  user: null,
  loginError: null,
  isLoadingAuth: false
};

export function authRecuder(state = initialState, action: FromAuthActions.AuthActionTypes) {
  switch (action.type) {
    case FromAuthActions.LOOGIN:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user: user,
        loginError: null,
        isLoadingAuth: false
      }
    case FromAuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case FromAuthActions.LOGIN_START:
      return {
        ...state,
        loginError: null,
        isLoadingAuth: true
      }
    case FromAuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        loginError: action.payload,
        isLoadingAuth: false
      }
    case FromAuthActions.SIGN_UP:
      return {
        ...state,
        loginError: null,
        isLoadingAuth: true
      }
    case FromAuthActions.CLEAR_ERROR:
      return {
        ...state,
        loginError: null,
      }
    default:
      return {
        ...state
      }
  }
}
