import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  radixMagicWand,
  radixGear,
  radixChevronUp,
} from '@ng-icons/radix-icons';
import { TextService } from '../../services/text.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../../services/communication.service';
import { NgxColorsModule } from 'ngx-colors';

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
  imports: [NgIconComponent, ReactiveFormsModule, CommonModule, FormsModule, NgxColorsModule ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [provideIcons({ radixMagicWand, radixGear, radixChevronUp })],
})
export class InputComponent implements OnInit {
  @Output() aiClicked = new EventEmitter();
  fonts: FontImageInterface[] = fontImage;

  selectedFont: number = 0;

  setting1: boolean = true;
  setting2: boolean = false;

  inputText: string = '';
  // selectedColor: string = '';
  selectedBackgroundColor: string = '';
  ctrl:any

  input1!: FormGroup;
  input2!: FormGroup;
  fontSizeForm!: FormGroup;

  selectedColor: string = "#3540c0";


  private textService = inject(TextService);
  private communicationService = inject(CommunicationService);
  private fb = inject(FormBuilder);
  fontSize: number = 30;

  ngOnInit(): void {
    this.input1 = this.fb.group({
      input: ['this world is so quick to judge & too late to understand'],
    });

    this.input2 = this.fb.group({
      input: ['- saint'],
    });

    this.fontSizeForm = this.fb.group({
      fontSize: [30, Validators.min(10)],
    });

    this.subscribeToFormChanges();

    const control1 = this.input1.get('input');
    const control2 = this.input2.get('input');
    this.ctrl = this.fontSizeForm.get('fontSize');

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

  

  subscribeToFormChanges(): void {
    if (this.ctrl) {
      this.ctrl.valueChanges.subscribe((value: any) => {
        console.log(value);
      });
    }
  }

  onRangeInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (this.ctrl) {
      this.ctrl.setValue(+value);
    }
  }

  aiBtnClicked(): void {
    this.aiClicked.emit();
  }

  setting1Toggled() {
    this.setting1 = !this.setting1;
  }

  setting2Toggled() {
    this.setting2 = !this.setting2;
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
