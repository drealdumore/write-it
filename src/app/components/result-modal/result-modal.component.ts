import { NgStyle } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  radixMagicWand,
  radixCross1,
  radixChevronLeft,
  radixRocket,
  radixDownload,
  radixCopy,
} from '@ng-icons/radix-icons';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import { ModalService } from '../../services/modal.service';
import { TextService } from '../../services/text.service';
import { ModalCanvasComponent } from '../modal-canvas/modal-canvas.component';

@Component({
  selector: 'result-modal',
  standalone: true,
  imports: [
    NgIconComponent,
    ClipboardModule,
    FormsModule,
    NgStyle,
    ModalCanvasComponent,
  ],
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.scss',
  viewProviders: [
    provideIcons({
      radixMagicWand,
      radixCross1,
      radixChevronLeft,
      radixRocket,
      radixDownload,
      radixCopy,
    }),
  ],
})
export class ResultModalComponent implements OnInit {
  private modalService = inject(ModalService);
  private clipboardService = inject(ClipboardService);
  private textService = inject(TextService);

  description: string = '';

  ngOnInit(): void {
    this.textService.aiResponseText.subscribe((newText) => {
      this.description = newText;
    });
  }

  close() {
    this.modalService.closeResultModal();
  }

  copyToClipboard() {
    this.clipboardService.copyFromContent(this.description);
  }
}
