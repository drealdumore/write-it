import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable()
// @Injectable({
//   providedIn: 'root'
// })
export class ModalService {
  modalSignal = signal<boolean>(true);
  modalObservable = toObservable(this.modalSignal);
  constructor() {}

  openModal() {
    this.modalSignal.set(true);
  }

  closeModal() {
    this.modalSignal.set(false);
  }
}
