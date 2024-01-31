import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private textSource = new BehaviorSubject<string>('this world is so quick to judge & too late to understand');
  currentText = this.textSource.asObservable();
  
  private text2Source = new BehaviorSubject<string>('- Saint');
  currentText2 = this.text2Source.asObservable();

  changeText(newText: string) {
    this.textSource.next(newText);
  }

  changeText2(newText: string) {
    this.text2Source.next(newText);
  }
}
