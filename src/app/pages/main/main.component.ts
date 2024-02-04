import { Component, inject } from '@angular/core';
import { InputComponent } from '../../models/input/input.component';
import { PreviewComponent } from '../../models/preview/preview.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AiModalComponent } from '../../components/ai-modal/ai-modal.component';
import { CommonModule } from '@angular/common';
import { ResultModalComponent } from '../../components/result-modal/result-modal.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    PreviewComponent,
    ModalComponent,
    AiModalComponent,
    ResultModalComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [ModalService],
})
export class MainComponent {
  private modalService = inject(ModalService);

  modalSignal = toSignal(this.modalService.modalObservable);

  isAiModal: boolean = false;
  isResultModal: boolean = false;

  aiModalActive() {
    this.modalService.openModal();
    // console.log('calling ai modal');
  }
}
