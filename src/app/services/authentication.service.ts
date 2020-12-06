import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../types';
import { Router } from '@angular/router';

const registeredUsers: User[] = [
  {
    email: 'nagylajos@test.com',
    userName: 'Nagy Lajos',
    password: 'nagylajos'
  },
  {
    email: 'foldijanos@test.com',
    userName: 'Földi János',
    password: 'foldijanos'
  },
  {
    email: 'tothflora@test.com',
    userName: 'Tóth Flóra',
    password: 'tothflora'
  }
];

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    if (!this.currentUserSubject) { return null; }
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    let result;
    registeredUsers.forEach((registeredUser) => {
      if (registeredUser.email === email && registeredUser.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(registeredUser));
        this.currentUserSubject.next(registeredUser);
        result = of(registeredUser);
      }
    });

    if (result) {
      return result;
    } else {
      return throwError('Not valid email or password!');
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
