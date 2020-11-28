import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  get(path: string, params?: Params): Observable<any> {
    const subject = new Subject<any>();
    const url = 'https://api.themoviedb.org/3';

    this.http.get(
      `${url}${path}`,
      { params })
      .subscribe(
        response => { subject.next(response); },
        error => {
          subject.error(error);
        },
        () => { subject.complete(); }
    );

    return subject;
  }
}
