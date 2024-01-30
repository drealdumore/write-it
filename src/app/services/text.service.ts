import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private textSource = new BehaviorSubject<string>('Quillify!');
  currentText = this.textSource.asObservable();

  changeText(newText: string) {
    this.textSource.next(newText);
  }
}
