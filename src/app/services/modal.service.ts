import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable()
export class ModalService {
  modalSignal = signal<boolean>(false);
  resultModal = signal<boolean>(false);

  modalObservable = toObservable(this.modalSignal);
  resultObservable = toObservable(this.resultModal);

  openModal() {
    this.modalSignal.set(true);
  }

  closeModal() {
    this.modalSignal.set(false);
  }

  openResultModal() {
    this.resultModal.set(true);
  }

  closeResultModal() {
    this.resultModal.set(false);
  }
}
