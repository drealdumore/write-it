import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'result-modal',
  standalone: true,
  imports: [NgIconComponent, ClipboardModule, FormsModule, NgStyle],
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
export class ResultModalComponent {
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
