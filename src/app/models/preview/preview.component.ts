import { Component, EventEmitter, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixDownload } from '@ng-icons/radix-icons';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [NgIconComponent, CanvasComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  viewProviders: [provideIcons({ radixDownload })],
})
export class PreviewComponent {
  @Output() downloadEmitter = new EventEmitter();

  download() {
    this.downloadEmitter.emit();
  }
}
