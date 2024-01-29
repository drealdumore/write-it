import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixMagicWand, radixCross1, radixChevronLeft, radixRocket, radixDownload } from '@ng-icons/radix-icons';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ai-modal',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './ai-modal.component.html',
  styleUrl: './ai-modal.component.scss',
  providers: [ModalService],
  viewProviders: [provideIcons({ radixMagicWand, radixCross1, radixChevronLeft, radixRocket, radixDownload })],
})
export class AiModalComponent {

private modalService = inject(ModalService)

close() {
  this.modalService.closeModal()
}
}
