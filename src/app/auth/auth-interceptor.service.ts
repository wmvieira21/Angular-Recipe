import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, exhaustMap, Observable, take, tap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.userObservable.pipe(
            take(1),
            /*catchError((error) => {
                return throwError(() => new Error(error))
            }),*/
            exhaustMap(user => {
                console.log('exhaustMap=' + !user);
                /*To some requests you must not add a auth param*/
                
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