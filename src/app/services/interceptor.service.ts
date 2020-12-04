import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmViYzEwNjkxY2IxMDZjZjc4ZmIxNjc4MjIxZmI4MiIsInN1YiI6IjVmYzE5MDY4Yjg0Zjk0MDA0MDA4YTVjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EZgYa8dtmQSmfgie0mch--cSx9SPxLbk5FER2R9jXhY';

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this.accessToken}`
      })
    });

    return next.handle(authReq);
  }
}
