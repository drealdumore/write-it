import { Component, inject } from '@angular/core';
import { InputComponent } from '../../models/input/input.component';
import { PreviewComponent } from '../../models/preview/preview.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AiModalComponent } from '../../components/ai-modal/ai-modal.component';
import { CommonModule } from '@angular/common';
import { ResultModalComponent } from '../../components/result-modal/result-modal.component';
import { LoaderService } from '../../services/loader.service';

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
  private loaderService = inject(LoaderService);

  modalSignal = toSignal(this.modalService.modalObservable);
  resultSignal = toSignal(this.modalService.resultObservable);

  isAiModal: boolean = false;
  isResultModal: boolean = false;

  ngOnInit(): void {
    this.loaderService.closeloader();
  }

  aiModalActive() {
    this.modalService.openModal();
  }
}
