import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FontService {
  fonts = [
    'hwAnita',
    'hwBernie',
    'hwBlaire',
    'hwCaitlin',
    'hwCharity',
    'hwChase',
    'hwDarleen',
    'hwDavid',
    'hwJarrod',
    'hwJonathan',
    'hwKate',
    'hwKelsey',
    'hwLulu',
    'hwRuthie',
    'hwWill',
  ];

  constructor() {}

  // loadFonts(): Promise<void[]> {
  //   const fontPromises = this.fonts.map((font) => {
  //     const fontFace = `url(./assets/fonts/${font}.woff2) format('woff2'), url(./assets/fonts/${font}.woff) format('woff')`;
  //     document.fonts.load(fontFace);
  //     return fontFace;
  //   });

  //   return Promise.all(fontPromises);
  // }


  loadFonts(): Observable<void> {
    const fontObservables = this.fonts.map((font) => {
      const fontFace = `url(./assets/fonts/${font}.woff2) format('woff2'), url(./assets/fonts/${font}.woff) format('woff')`;

      return new Observable<void>((observer) => {
        document.fonts.load(fontFace).then(
          () => {
            observer.next(); // Signal font loaded
            observer.complete(); // Complete the observable
          },
          (error) => {
            observer.error(error); // Signal error if font loading fails
          }
        );
      });
    });

    return forkJoin(fontObservables).pipe(
      map(() => {}) // Return void after all fonts are loaded
    );
  }

  preloadFonts(): Promise<void> {
    const fontPromises = this.fonts.map((font) => {
      const fontFace = new FontFace(
        font,
        `url(./assets/fonts/${font}.woff2) format('woff2'), url(./assets/fonts/${font}.woff) format('woff')`
      );

      return fontFace.load().then(() => {
        (document.fonts as any).add(fontFace); 
      });
    });

    return Promise.all(fontPromises).then(() => {}); 
  }

  getFontName(index: number): string {
    return this.fonts[index] || ''; 
  }
}
