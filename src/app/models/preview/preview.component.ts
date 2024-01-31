import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixDownload } from '@ng-icons/radix-icons';
import { CanvasComponent } from '../canvas/canvas.component';
import { TextService } from '../../services/text.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [NgIconComponent, CanvasComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  viewProviders: [provideIcons({ radixDownload })],
})
export class PreviewComponent implements OnDestroy {
  @ViewChild('canvasEl', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private currentFontIndex: number = 2;
  private subscription: Subscription;

  fonts = ['hwAnita', 'hwBernie', 'hwBlaire', 'hwChase', 'hwDavid', 'hwKate'];
  text1: string = '';
  text2: string = '';

  color: string = '#3540c0';

  constructor(
    private communicationService: CommunicationService,
    private textService: TextService
  ) {
    console.log(this.currentFontIndex);

    this.subscription = this.communicationService.message$.subscribe(
      (message) => {
        this.receiveMessageFromInput(message);
      }
    );
  }

  loadFonts() {
    const fontPromises = this.fonts.map((font) => {
      const fontFace = `url(./assets/fonts/${font}.woff2) format('woff2'), url(./assets/fonts/${font}.woff) format('woff')`;
      // const fontFace = new FontFace(font, `url(./assets/fonts/${font}.woff2) format('woff2'), url(./assets/fonts/${font}.woff) format('woff')`);
      document.fonts.load(fontFace);
      return fontFace;
    });

    return Promise.all(fontPromises);
  }

  receiveMessageFromInput(message: any) {
    console.log('Received message from input:', message);
    this.currentFontIndex = message;

    this.changeFontWithCurrentFont(this.text1);
    this.changeFontWithCurrentFont(this.text2);
  }

  ngOnInit() {
    this.loadFonts().then(() => {
      // Add event listener to check when fonts are loaded
      document.fonts.addEventListener('loadingdone', () => {
        this.changeFont(this.fonts[this.currentFontIndex]); 
      });
    });

    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    // this.changeFont(this.fonts[1]);

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
  }
  changeFont(font: string) {
    this.currentFontIndex = this.fonts.indexOf(font);
    // this.currentFontIndex = this.fonts.indexOf(font);
    this.textService.currentText.subscribe((newText) => {
      this.changeFontWithCurrentFont(newText);
    });
    console.log('😂💚➡', this.currentFontIndex);
    console.log('😂💚➡', this.fonts[this.currentFontIndex]);
  }

  changeFontWithCurrentFont(newText: string) {
    // Enable image smoothing
    this.ctx.imageSmoothingEnabled = true;

    this.ctx.font = `30px ${this.fonts[this.currentFontIndex]}`;
    const canvasWidth = this.canvas.nativeElement.width;
    let canvasHeight = this.canvas.nativeElement.height;
    const lineHeight = 22;

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    const xOffset = 20;

    // Initialize variables for positioning
    let x = xOffset;
    let y = lineHeight;

    const currentText = this.text1 || this.text2; // Use either text1 or text2 based on your logic
    const words = currentText.split(' ');

    words.forEach((word, index) => {
      const wordWidth = this.ctx.measureText(word).width;

      // Check if the word exceeds the available width
      if (x + wordWidth > canvasWidth) {
        // Move to the next line
        x = xOffset;
        y += lineHeight;
      }

      // Check if the text exceeds the current canvas height
      if (y + lineHeight > canvasHeight) {
        // Increase the canvas height
        canvasHeight += lineHeight;
        this.canvas.nativeElement.height = canvasHeight;
      }

      // Draw the word
      this.ctx.fillStyle = this.color;
      this.ctx.fillText(word, x, y);

      // Update the x position for the next word
      x +=
        wordWidth +
        (index < words.length - 1 ? this.ctx.measureText(' ').width : 0);
    });

    // Set position for the additional text from the second observable
    const additionalText = this.text2;
    const additionalTextWidth = this.ctx.measureText(additionalText).width;
    const additionalTextX = canvasWidth - additionalTextWidth;
    const additionalTextY = canvasHeight - lineHeight;

    // Draw the additional text from the second observable close to the bottom and aligned to the right
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(additionalText, additionalTextX, additionalTextY);
  }

  nextFont() {
    this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
    this.changeFont(this.fonts[this.currentFontIndex]);
    console.log('✔😢🚫');
  }

  downloadCanvas() {
    const canvas = this.canvas.nativeElement;
    const dataUrl = canvas.toDataURL(); // Get the data URL of the canvas
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'quillify-letterify.jpg'; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
