import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subject, finalize, from, of, switchMap } from 'rxjs';

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

  // storage and database service
  imagePath = signal('');
  imageUrl = signal('');

  constructor(
    private fireStorage: AngularFireStorage,
    private realtimeDatabase: AngularFireDatabase,
    private http: HttpClient
  ) {}

  private imageInfoSubject = new Subject<{ url: string; path: string }>();

  imageInfo$: Observable<{ url: string; path: string }> =
    this.imageInfoSubject.asObservable();

  uploadImage(blob: Blob): void {
    this.imageUrl.set(this.generateRandomId());
    this.imagePath.set(`images/write-it_${this.imageUrl()}.png`);

    const uploadTask = this.fireStorage.upload(this.imagePath(), blob);
    // console.log(this.imagePath());

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.fireStorage
            .ref(this.imagePath())
            .getDownloadURL()
            .subscribe((url) => {
              this.imageInfoSubject.next({ url, path: this.imagePath() });
              this.saveImagePathToDatabase(this.imagePath(), this.imageUrl());
            });
        })
      )
      .subscribe();
  }

  getImageUrl(imagePath: string): Observable<any> {
    return this.realtimeDatabase
      .object('imagePaths/' + imagePath)
      .valueChanges();
  }

  private saveImagePathToDatabase(imagePath: string, imageUrl: string): void {
    this.realtimeDatabase
      .object('imagePaths/' + imageUrl)
      .set({ url: imageUrl, path: imagePath });
  }

  getData() {
    return this.imagePath() && this.imageUrl();
  }

  getImageAndUrlById(id: string): Observable<{ url: string; path: string }> {
    const imagePath = `images/write-it_${id}.png`;

    return this.realtimeDatabase
      .object<{ url: string; path: string }>('imagePaths/' + id)
      .valueChanges()
      .pipe(
        switchMap((data) => {
          if (data) {
            return this.getDownloadUrl(imagePath).pipe(
              finalize(() => {
                // console.log('Image URL:', data.url);
              })
            );
          } else {
            console.error('Document not found for id:', id);
            // Returning an observable with a default or placeholder value
            return of({ url: '', path: '' });
          }
        })
      );
  }

  getDownloadUrl(imagePath: string): Observable<{ url: string; path: string }> {
    return from(this.fireStorage.ref(imagePath).getDownloadURL()).pipe(
      switchMap((url) => of({ url, path: imagePath }))
    );
  }

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

  // getImage(path: string): Observable<Blob> {
  //   const imageRef = this.fireStorage.ref(path);

  //   return imageRef.getDownloadURL().pipe(
  //     // Fetch image as Blob
  //     finalize(() => {
  //       imageRef.getDownloadURL().toPromise().then(console.log);
  //     })
  //   );
  // }

  getImage(path: string): Observable<Blob> {
    const imageRef = this.fireStorage.ref(path);

    return imageRef.getDownloadURL().pipe(
      // Fetch image as Blob
      finalize(() => {
        imageRef.getDownloadURL().toPromise().then(console.log);
      })
    );
  }

  // getImage(url: string): Observable<Blob> {
  //   return this.http.get(url, { responseType: 'blob' });
  // }
}
