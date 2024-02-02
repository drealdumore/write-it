import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TextService } from '../../services/text.service';
import { ExtComponent } from './ext/ext.component';

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
  fonts = [
    'hwAnita',
    'hwBernie',
    'hwBlaire',
    'hwCaitlin',
    'hwCharity',
    'hwChase',
    'hwDavid',
    'hwDarleen',
    'hwLulu',
    'hwJarrod',
    'hwKate',
    'hwJennifer',
    'hwRuthie',
    'hwKelsey',
    'hwJonathan',
    'hwWill',
  ];
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

    this.ctx.font = `130px ${this.fonts[this.currentFontIndex]}`;
    const canvasWidth = this.canvas.nativeElement.width;
    const canvasHeight = this.canvas.nativeElement.height;
    const lineHeight = 22;

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Center horizontally
    const textWidth = this.ctx.measureText(newText).width;
    const xOffset = (canvasWidth - textWidth) / 2;

    // Center vertically
    const yOffset = (canvasHeight + 30) / 2; // Adjust the 30 to your desired text height

    // Draw the text
    this.ctx.fillStyle = '#3540c0';
    this.ctx.fillText(newText, xOffset, yOffset);
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
    link.download = 'canvas_image.jpg'; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
