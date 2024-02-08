import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderSignal = signal<boolean>(true);
  loaderObservable = toObservable(this.loaderSignal);

  openloader() {
    this.loaderSignal.set(true);
  }

  closeloader() {
    this.loaderSignal.set(false);
  }
}
