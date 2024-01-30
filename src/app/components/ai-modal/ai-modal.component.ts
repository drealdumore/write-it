import { Component, OnInit, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixMagicWand, radixCross1 } from '@ng-icons/radix-icons';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'ai-modal',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule],
  templateUrl: './ai-modal.component.html',
  styleUrl: './ai-modal.component.scss',
  viewProviders: [
    provideIcons({
      radixMagicWand,
      radixCross1,
    }),
  ],
})
export class AiModalComponent implements OnInit {
  descriptionGroup!: FormGroup;

  private modalService = inject(ModalService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.descriptionGroup = this.fb.group({
      input: [''],
    });
  }

  generateWithAi() {
    console.log(this.descriptionGroup.value.input);
  }

  close() {
    this.modalService.closeModal();
  }
}
