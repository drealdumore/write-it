import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Message {
  fontSize1: number;
  fontColor1: any;
  fontSize2: number;
  fontColor2: any;
  selectedFont: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private messageSource = new Subject<Message>();
  message$ = this.messageSource.asObservable();

  private fontSelectedSource = new Subject<number>();
  fontSelected$ = this.fontSelectedSource.asObservable();

  sendMessage(message: Message) {
    this.messageSource.next(message);
  }

  sendFontSelected(index: number) {
    this.fontSelectedSource.next(index);
  }
}
