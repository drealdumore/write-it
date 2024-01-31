import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixMagicWand, radixGear } from '@ng-icons/radix-icons';
import { TextService } from '../../services/text.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../../services/communication.service';

interface FontImageInterface {
  src: string;
  alt: string;
}

const fontImage: FontImageInterface[] = [
  {
    src: '/assets/fnt/anitaFont.jpg',
    alt: 'anitaFont',
  },
  {
    src: '/assets/fnt/bernieFont.jpg',
    alt: 'bernieFont',
  },
  {
    src: '/assets/fnt/blaireFont.jpg',
    alt: 'blaireFont',
  },
  {
    src: '/assets/fnt/chaseFont.jpg',
    alt: 'chaseFont',
  },
  {
    src: '/assets/fnt/davidFont.jpg',
    alt: 'davidFont',
  },
  {
    src: '/assets/fnt/kateFont.jpg',
    alt: 'kateFont',
  },
];

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [provideIcons({ radixMagicWand, radixGear })],
})
export class InputComponent implements OnInit {
  @Output() aiClicked = new EventEmitter();

  selectedFont: number = 0;
  inputText: string = '';
  selectedColor: string = '';
  selectedBackgroundColor: string = '';

  fonts: FontImageInterface[] = fontImage;
  input1!: FormGroup;
  input2!: FormGroup;

  private textService = inject(TextService);
  private communicationService = inject(CommunicationService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.input1 = this.fb.group({
      input: ['this world is so quick to judge & too late to understand'],
    });

    this.input2 = this.fb.group({
      input: ['- saint'],
    });

    const control1 = this.input1.get('input');
    const control2 = this.input2.get('input');

    if (control1) {
      control1.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        const currentText: string = this.input1.value.input;
        this.textService.changeText(currentText);
        console.log(currentText);
      });
    }
    
    if (control2) {
      control2.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        const currentText: string = this.input2.value.input;
        this.textService.changeText2(currentText);
        console.log(currentText);
      });
    }
  }

  aiBtnClicked(): void {
    this.aiClicked.emit();
  }

  fontSelected(index: number): void {
    // Check if the index is valid
    if (index >= 0 && index < this.fonts.length) {
      // Set the selectedFont based on the index
      this.selectedFont = index;
      this.communicationService.sendMessage(this.selectedFont);
    }
  }

  // sendMessageToCanvas() {
  //   const message = {
  //     font: this.selectedFont,
  //     input: this.inputText,
  //     color: this.selectedColor,
  //     backgroundColor: this.selectedBackgroundColor,
  //   };

  //   this.communicationService.sendMessage(message);
  // }
}
