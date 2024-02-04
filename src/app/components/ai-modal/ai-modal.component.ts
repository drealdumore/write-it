import { Component, OnInit, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixMagicWand, radixCross1 } from '@ng-icons/radix-icons';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AiService } from '../../services/ai.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'ai-modal',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, CommonModule],
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

  userInput = '';
  chatHistory: string[] = [];

  private modalService = inject(ModalService);
  private aiService = inject(AiService);
  private fb = inject(FormBuilder);

  constructor(private http: HttpClient) {}

  messages = [{ role: 'system', content: 'You are a helpful assistant.' }];

  ngOnInit() {
    this.descriptionGroup = this.fb.group({
      input: [''],
    });

    const control = this.descriptionGroup.get('input');
    if (control) {
      control.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        this.userInput = this.descriptionGroup.value.input;
        console.log(this.userInput);
      });
    }
  }

  result: any;

  generateWithAi() {
    console.log(this.descriptionGroup.value.input);
    // let url = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
    let url = 'https://api.openai.com/v1/chat/completions';

    let httpHeader = new HttpHeaders().set(
      'Authorization',
      'Bearer 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'
    );

    let payload = {
      model: 'gpt-3.5-turbo',
      messages: this.messages,
    };

    this.http.post(url, payload, { headers: httpHeader }).subscribe({
      next: (resp) => {
        this.result = resp;
        console.log(JSON.stringify(resp));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendMessage() {
    this.chatHistory.push(`You: ${this.userInput}`);

    this.aiService.sendMessage(this.userInput).subscribe(
      (response) => {
        const reply = response.choices[0]?.text || 'No response from ChatGPT.';
        this.chatHistory.push(`ChatGPT: ${reply}`);
      },
      (error) => {
        console.error('Error sending message to ChatGPT:', error);
      }
    );

    this.userInput = ''; // Clear the input field
  }

  close() {
    this.modalService.closeModal();
  }
}
