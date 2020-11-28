import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isSpinnerVisible = new BehaviorSubject(false);
  isSpinnerVisible$ = this.isSpinnerVisible.asObservable();

  constructor() { }

  showSpinner(): void {
    this.isSpinnerVisible.next(true);
  }

  hideSpinner(): void {
    this.isSpinnerVisible.next(false);
  }
}
