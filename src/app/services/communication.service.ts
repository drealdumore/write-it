import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Message {
  font: string;
  input: string;
  color: string;
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private messageSource = new Subject();
  // private messageSource = new Subject<Message>();
  message$ = this.messageSource.asObservable();

  private fontSelectedSource = new Subject<number>();

  fontSelected$ = this.fontSelectedSource.asObservable();


  sendMessage(message: any) {
  // sendMessage(message: Message) {
    this.messageSource.next(message);
  }


  sendFontSelected(index: number) {
    this.fontSelectedSource.next(index);
  }
}
