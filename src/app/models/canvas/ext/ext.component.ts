import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextService } from '../../../services/text.service';

@Component({
  selector: 'app-ext',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ext.component.html',
  styleUrl: './ext.component.scss',
})
export class ExtComponent {
  currentText: string = 'canvas';

  constructor(private textService: TextService) {}

  updateText() {
    this.textService.changeText(this.currentText);
  }
}
