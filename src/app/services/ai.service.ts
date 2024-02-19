import { Injectable, inject, signal } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private modalService = inject(ModalService);

  private model: any;

  private apiKey = signal('AIzaSyCl6sfNShC9bv6Qk2cYN7r-pYZFJHrCOP4');

  AI = new GoogleGenerativeAI(this.apiKey());

  constructor() {
    this.model = this.AI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateText(
    selectedType: string,
    description: string
  ): Promise<string> {
    let prompt = '';

    if (selectedType === 'quote') {
      prompt += ` Write a quote/saying that ${description}`;
    } else if (selectedType === 'story') {
      prompt += ` Write a short story about ${description}`;
    }

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
      // this.modalService.openResultModal();

    } catch (error) {
      console.error('Error generating text:', error);
      return '';
    }
  }
}
