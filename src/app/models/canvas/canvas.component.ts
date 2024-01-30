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
    this.ctx.font = `30px ${this.fonts[this.currentFontIndex]}`;

    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    const canvasWidth = this.canvas.nativeElement.width;
    const canvasHeight = this.canvas.nativeElement.height;
    const textWidth = this.ctx.measureText(newText).width;

    // Calculate X and Y to center the text
    const x = (canvasWidth - textWidth) / 2;
    const y = canvasHeight / 2;

    this.ctx.fillText(newText, x, y);
  }

  nextFont() {
    this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
    this.changeFont(this.fonts[this.currentFontIndex]);
    console.log('✔😢🚫');
  }
}
