import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, params, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());


        function handleRoute() {

            console.log('mock: going to:', url, 'body', body, 'param', params.toString());
            switch (true) {
                case url.endsWith('auth/login') && method === 'POST':
                    return ok({ userName: 'admin', token: 'debug_token' });
                default:
                    // pass through any requests not handled above
                    console.log('not mocked');
                    return next.handle(request);
            }
        }
        function ok(httpBody?) {
            return of(new HttpResponse({ status: 200, body: httpBody }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }
    }
}

export const httpMockProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpMockInterceptor,
    multi: true
};
