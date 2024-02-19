import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixMagicWand, radixCross1 } from '@ng-icons/radix-icons';
import { ModalService } from '../../services/modal.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AiService } from '../../services/ai.service';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
import { TextService } from '../../services/text.service';
@Component({
  selector: 'ai-modal',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './ai-modal.component.html',
  styleUrl: './ai-modal.component.scss',
  // providers: [ModalService],
  viewProviders: [
    provideIcons({
      radixMagicWand,
      radixCross1,
    }),
  ],
})
export class AiModalComponent implements OnInit {
  descriptionGroup!: FormGroup;
  selectForm!: FormGroup;

  userInput = signal('happy birthday');
  loading = signal(false);

  private modalService = inject(ModalService);
  private aiService = inject(AiService);
  private textService = inject(TextService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.descriptionGroup = this.fb.group({
      input: [''],
    });

    this.selectForm = this.fb.group({
      selectedType: new FormControl('quote', [Validators.required]),
    });

    const control = this.descriptionGroup.get('input');

    if (control) {
      control.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        this.userInput.set(this.descriptionGroup.value.input);
      });
    }
  }

  async generateText() {
    this.loading.set(true)
    const selectedType = this.selectForm.get('selectedType')?.value;

    const generatedText = await this.aiService.generateText(
      selectedType,
      this.userInput()
    );
    if (generatedText) {
      this.textService.changeAiText(generatedText);
      this.modalService.closeModal();
      this.modalService.openResultModal();
    }


  }

  close() {
    this.modalService.closeModal();
  }
}
