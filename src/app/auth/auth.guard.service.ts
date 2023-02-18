import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromAppReducer from '../store/app.reducer';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router,
        private store: Store<fromAppReducer.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        /*return this.authService.userObservable.pipe(take(1),
            map(user => {
                if (user) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
            }));*/

        //NGRX
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                if (authState.user) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
            }));
    }
}