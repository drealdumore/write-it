import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixDownload } from '@ng-icons/radix-icons';
import { CanvasComponent } from '../canvas/canvas.component';
import { TextService } from '../../services/text.service';
import { CommunicationService } from '../../services/communication.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { FontService } from '../../services/font.service';

@Component({
  selector: 'preview',
  standalone: true,
  imports: [NgIconComponent, CanvasComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  viewProviders: [provideIcons({ radixDownload })],
})
export class PreviewComponent {
  @ViewChild('canvasEl', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private currentFontIndex: number = 0;
  private messageFromInput: any;

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

  data = signal('');
  userId = signal('');
  loading = signal<boolean>(false);

  text1: string = '';
  text2: string = '';
  imgLink: string = '';

  fontSize1: number = 0;
  fontColor1: any;
  fontSize2: number = 0;
  fontColor2: any;

  canvasDataURL: string = '';
  unit: string = 'px';

  private communicationService = inject(CommunicationService);
  private textService = inject(TextService);
  private fontService = inject(FontService);
  private router = inject(Router);

  constructor() {
    this.communicationService.message$.subscribe((message) => {
      this.receiveMessageFromInput(message);
    });
  }

  receiveMessageFromInput(message: any) {
    this.messageFromInput = message;
    // console.log(this.messageFromInput);

    this.fontSize1 = this.messageFromInput.fontSize1;
    this.fontColor1 = this.messageFromInput.fontColor1;
    this.fontSize2 = this.messageFromInput.fontSize2;
    this.fontColor2 = this.messageFromInput.fontColor2;

    this.currentFontIndex = this.messageFromInput.selectedFont;

    this.changeFontWithCurrentFont(this.text1);
    this.changeFontWithCurrentFont(this.text2);
  }

  loadFonts() {
    const fontPromises = this.fonts.map((font) => {
      const fontFace = `url(./assets/fonts/${font}.woff2) format('woff2'), url(./assets/fonts/${font}.woff) format('woff')`;
      document.fonts.load(fontFace);
      return fontFace;
    });

    return Promise.all(fontPromises);
  }

  ngOnInit() {
    this.loadFonts().then(() => {
      document.fonts.addEventListener('loadingdone', () => {
        this.changeFont(this.fonts[this.currentFontIndex]);
        this.loading.set(false);
      });

      document.fonts.addEventListener('loading', () => {
        this.loading.set(true);
      });

      document.fonts.addEventListener('error', (error) => {
        console.error('Font loading error:', error);
      });
    });

    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    // Subscribe to text changes for text1
    this.textService.currentText.subscribe((newText) => {
      this.text1 = newText;
      this.changeFontWithCurrentFont(this.text1);
    });

    // Subscribe to text changes for text2
    this.textService.currentText2.subscribe((newText) => {
      this.text2 = newText;
      this.changeFontWithCurrentFont(this.text2);
    });

    

    // this.fontService.loadFonts().subscribe(() => {
    //   this.changeFont(this.fontService.getFontName(this.currentFontIndex));
    //   this.loading.set(false);
    // });

    // this.fontService.preloadFonts().then(() => {
    //   this.changeFont(this.fontService.getFontName(this.currentFontIndex));
    //   this.loading.set(false);
    // });
  }

  changeFont(font: string) {
    this.currentFontIndex = this.fonts.indexOf(font);
    this.textService.currentText.subscribe((newText) => {
      this.changeFontWithCurrentFont(newText);
    });
  }

  changeFontWithCurrentFont(newText: string) {
    this.ctx.font = `${this.fontSize1}${this.unit} ${
      this.fonts[this.currentFontIndex]
    }`;

    const canvasWidth = this.canvas.nativeElement.width;
    let canvasHeight = this.canvas.nativeElement.height;
    const lineHeight = 22;
    const padding = 10; // Padding from canvas border

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Calculate equal padding on both sides
    const xOffset = padding;

    // For positioning
    let x = xOffset;
    let y = lineHeight + 5; // padding top from canvas border

    const text1 = this.text1;
    const text2 = this.text2;

    const currentText = text1 || text2;
    const words = currentText.split(' ');

    words.forEach((word, index) => {
      const wordWidth = this.ctx.measureText(word).width;

      // Check if the word exceeds the available width
      if (x + wordWidth > canvasWidth - xOffset) {
        // Move to the next line
        x = xOffset;
        y += lineHeight;
      }

      // Check if the text exceeds the current canvas height
      if (y + lineHeight > canvasHeight) {
        // Increase the canvas height
        canvasHeight += lineHeight;
        this.canvas.nativeElement.height = canvasHeight;
        // Update the context after increasing the canvas height
        // this.ctx = this.canvas.nativeElement.getContext('2d')!;
      }

      // Draw the word
      this.ctx.fillStyle = this.fontColor1;
      this.ctx.fillText(word, x, y);

      // Update the x position for the next word
      x +=
        wordWidth +
        (index < words.length - 1 ? this.ctx.measureText(' ').width : 0);
    });

    // Set position for the additional text from the second observable
    // const additionalTextWidth = this.ctx.measureText(text2).width;
    // const additionalTextX = canvasWidth - additionalTextWidth - xOffset;
    // const additionalTextY = y + lineHeight + padding; // Place it below the first text with padding

    // // Draw the additional text from the second observable with padding from the first text
    // this.ctx.fillStyle = this.fontColor2;
    // this.ctx.font = `${this.fontSize2}${this.unit} ${
    //   this.fonts[this.currentFontIndex]
    // }`;
    // this.ctx.fillText(text2, additionalTextX, additionalTextY);

    const additionalTextWidth = this.ctx.measureText(text2).width;
    const additionalTextX = canvasWidth - additionalTextWidth - xOffset;
    // const additionalTextY = y + lineHeight + padding;

    // Add padding of 15px from the bottom for text2
    const additionalTextY = canvasHeight - 15;

    // Draw the additional text from the second observable with padding from the first text
    this.ctx.fillStyle = this.fontColor2;
    this.ctx.font = `${this.fontSize2}${this.unit} ${
      this.fonts[this.currentFontIndex]
    }`;
    this.ctx.fillText(text2, additionalTextX, additionalTextY);

    const canvas = this.canvas.nativeElement;
    this.canvasDataURL = canvas.toDataURL();
    // this.renderer.setStyle(canvas, 'visibility', 'hidden');
  }

  nextFont() {
    this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
    this.changeFont(this.fonts[this.currentFontIndex]);
  }

  async downloadCanvas() {
    const canvas = this.canvas.nativeElement;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'write-it.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const blob = await fetch(dataURL).then((res) => res.blob());

    const url = this.communicationService.uploadImage(blob);

    // returns the id of the image
    this.data.set(this.communicationService.getData());
  }

  async uploadPhoto() {
    try {
      const canvasElement = this.canvas.nativeElement;

      // Convert canvas to data URL
      const dataURL = canvasElement.toDataURL('image/png');

      // Convert data URL to Blob
      const blob = await fetch(dataURL).then((res) => res.blob());

      const url = this.communicationService.uploadImage(blob);

      // returns the id of the image
      this.data.set(this.communicationService.getData());

      this.router.navigate([`/download/${this.data()}`]);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
