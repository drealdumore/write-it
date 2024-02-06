import { Injectable, signal } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subject, finalize, from, switchMap } from 'rxjs';

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

  imagePath = signal('');
  imageUrl = signal('');
  constructor(private fireStorage: AngularFireStorage) {}

  private imageInfoSubject = new Subject<{ url: string; path: string }>();

  imageInfo$: Observable<{ url: string; path: string }> =
    this.imageInfoSubject.asObservable();

  uploadImage(blob: Blob): void {
    this.imageUrl.set (this.generateRandomId());
    this.imagePath.set(`images/write-it_${this.imageUrl()}.png`);

    const uploadTask = this.fireStorage.upload(this.imagePath(), blob);
    console.log(this.imagePath());

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.fireStorage
            .ref(this.imagePath())
            .getDownloadURL()
            .subscribe((url) => {
              this.imageInfoSubject.next({ url, path: this.imagePath() });
            });
        })
      )
      .subscribe();
  }

  getDownloadUrl(imagePath: string): Observable<string> {
    imagePath = this.imagePath();
    console.log(this.imagePath());

    return from(this.fireStorage.ref(imagePath).getDownloadURL());
  }

  getData() {
    return this.imagePath() && this.imageUrl();
  }

  // I want to save the imagepath and id and then retrieve it to use in the download

  private generateRandomId(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
}
