import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, Observable, take, tap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import * as fromAppReducer from '../store/app.reducer';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
        private store: Store<fromAppReducer.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*return this.authService.userObservable.pipe(
            take(1),
            exhaustMap(user => {
                console.log('exhaustMap=' + !user);
                To some requests you must not add a auth param
                
                if (!user) {
                    return next.handle(req);
                }

                If we don't get a user we'll have the error below
                TypeError: You provided 'undefined' where a stream was expected. 
                You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.

                const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
                return next.handle(modifiedReq);
            })
        );*/

        //NGRX
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                console.log('exhaustMap=' + !user);
                //To some requests you must not add a auth param

                if (!user) {
                    return next.handle(req);
                }

                /*If we don't get a user we'll have the error below
                TypeError: You provided 'undefined' where a stream was expected. 
                You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.*/

                const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
                return next.handle(modifiedReq);
            })
        );
    }
}