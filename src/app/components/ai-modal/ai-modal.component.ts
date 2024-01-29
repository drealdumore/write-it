import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  radixMagicWand,
  radixCross1,
  radixChevronLeft,
  radixRocket,
  radixDownload,
  radixCopy,
} from '@ng-icons/radix-icons';
import { ModalService } from '../../services/modal.service';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'ai-modal',
  standalone: true,
  imports: [NgIconComponent, ClipboardModule, FormsModule, NgStyle],
  templateUrl: './ai-modal.component.html',
  styleUrl: './ai-modal.component.scss',
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
export class AiModalComponent {
  private modalService = inject(ModalService);
  private clipboardService = inject(ClipboardService);
  description: string = '';

  close() {
    this.modalService.closeModal();
  }

  copyToClipboard() {
    this.clipboardService.copyFromContent(this.description);
  }
}
