import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiKey = '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';
  // private apiKey = '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';
  private apiUrl =
    'https://api.openai.com/v1/engines/text-ada-001/completions'; // Adjust the endpoint based on your OpenAI API version and model
    // 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Adjust the endpoint based on your OpenAI API version and model

  constructor(private http: HttpClient) {}

  sendMessage(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const data = {
      prompt: prompt,
      max_tokens: 150, 
    };

    return this.http.post<any>(this.apiUrl, data, { headers });
  }
}
