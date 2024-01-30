import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TextService } from '../../services/text.service';
import { ExtComponent } from '../ext/ext.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule, ExtComponent],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvasEl', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  fonts = ['hwAnita', 'hwBernie', 'hwBlaire', 'hwChase', 'hwSantaClaus'];
  private currentFontIndex = 0;

  constructor(private textService: TextService) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.changeFont(this.fonts[1]);

    // Subscribe to text changes
    this.textService.currentText.subscribe((newText) => {
      this.changeFontWithCurrentFont(newText);
    });
  }

  changeFont(font: string) {
    this.currentFontIndex = this.fonts.indexOf(font);
    this.textService.currentText.subscribe((newText) => {
      this.changeFontWithCurrentFont(newText);
    });
    console.log('😂💚➡', this.currentFontIndex);
  }

  changeFontWithCurrentFont(newText: string) {
    // Enable image smoothing
    this.ctx.imageSmoothingEnabled = true;

    this.ctx.font = `30px ${this.fonts[this.currentFontIndex]}`;
    const canvasWidth = this.canvas.nativeElement.width;
    const canvasHeight = this.canvas.nativeElement.height;
    const lineHeight = 22;

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    const xOffset = 20;

    // Initialize variables for positioning
    // let x = 0;
    let x = xOffset;
    let y = lineHeight;

    const words = newText.split(' ');

    words.forEach((word, index) => {
      const wordWidth = this.ctx.measureText(word).width;

      // Check if the word exceeds the available width
      if (x + wordWidth > canvasWidth) {
        // Move to the next line
        x = xOffset;
        y += lineHeight;
      }

      // Draw the word
      this.ctx.fillStyle = '#3540c0';
      this.ctx.fillText(word, x, y);

      // Update the x position for the next word
      x +=
        wordWidth +
        (index < words.length - 1 ? this.ctx.measureText(' ').width : 0);
    });
  }

  // changeFontWithCurrentFont(newText: string) {
  //   this.ctx.font = `10px ${this.fonts[this.currentFontIndex]}`;
  //   this.ctx.clearRect(
  //     0,
  //     0,
  //     this.canvas.nativeElement.width,
  //     this.canvas.nativeElement.height
  //   );

  //   const canvasWidth = this.canvas.nativeElement.width;
  //   const canvasHeight = this.canvas.nativeElement.height;
  //   const textWidth = this.ctx.measureText(newText).width;

  //   this.ctx.fillStyle = 'white';
  //   this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //   // Calculate X and Y to center the text
  //   const x = (canvasWidth - textWidth) / 2;
  //   const y = (canvasHeight + 100) / 2 - 17;

  //   this.ctx.fillStyle = '#3540c0';
  //   this.ctx.fillText(newText, x, y);
  // }

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
    link.download = 'canvas_image.jpg'; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
