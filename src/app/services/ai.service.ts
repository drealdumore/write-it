import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private model: any;

  private apiKey = signal('AIzaSyCl6sfNShC9bv6Qk2cYN7r-pYZFJHrCOP4');

  generatAI = new GoogleGenerativeAI(this.apiKey());

  constructor() {
    this.model = this.generatAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  // async generateText(prompt: string): Promise<string> {
  //   try {
  //     const result = await this.model.generateContent(prompt);
  //     const response = await result.response;
  //     return response.text();
  //   } catch (error) {
  //     console.error('Error generating text:', error);
  //     return '';
  //   }
  // }

  async generateText(selectedType: string, description: string): Promise<string> {
    let finalPrompt = '';

    if (selectedType === 'quote') {
      finalPrompt += ` Write a quote/saying that ${description}`;
    } else if (selectedType === 'story') {
      finalPrompt += ` Write a short story about ${description}`;
    }
  
    try {
      const result = await this.model.generateContent(finalPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating text:', error);
      return '';
    }
  }
  
}
