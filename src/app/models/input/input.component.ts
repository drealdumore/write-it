import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
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
import {
  CommunicationService,
  Message,
} from '../../services/communication.service';
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
    src: '/assets/fnt/caitlinFont.png',
    alt: 'caitlinFont',
  },
  {
    src: '/assets/fnt/charityFont.png',
    alt: 'charityFont',
  },
  {
    src: '/assets/fnt/chaseFont.jpg',
    alt: 'chaseFont',
  },
  {
    src: '/assets/fnt/darleenFont.png',
    alt: 'darleenFont',
  },
  {
    src: '/assets/fnt/davidFont.jpg',
    alt: 'davidFont',
  },
  {
    src: '/assets/fnt/jarrodFont.png',
    alt: 'jarrodFont',
  },
  {
    src: '/assets/fnt/jonathanFont.png',
    alt: 'jonathanFont',
  },
  {
    src: '/assets/fnt/kateFont.jpg',
    alt: 'kateFont',
  },
  {
    src: '/assets/fnt/kelseyFont.png',
    alt: 'kelseyFont',
  },
  {
    src: '/assets/fnt/luluFont.png',
    alt: 'luluFont',
  },
  {
    src: '/assets/fnt/ruthieFont.png',
    alt: 'ruthieFont',
  },
  {
    src: '/assets/fnt/willFont.png',
    alt: 'willFont',
  },
];

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxColorsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [provideIcons({ radixMagicWand, radixGear, radixChevronUp })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @ViewChild('collapsibleButton') collapsibleButton!: ElementRef;
  @ViewChild('collapsibleContent') collapsibleContent!: ElementRef;

  @ViewChild('collapsibleButton2') collapsibleButton2!: ElementRef;
  @ViewChild('collapsibleContent2') collapsibleContent2!: ElementRef;

  setting1Toggled() {
    this.setting1 = !this.setting1;

    const buttonElement = this.collapsibleButton.nativeElement;
    const contentElement = this.collapsibleContent.nativeElement;

    if (this.setting1) {
      this.renderer.addClass(buttonElement, 'active');

      if (contentElement) {
        this.renderer.setStyle(contentElement, 'maxHeight', '150px');
        this.renderer.setStyle(contentElement, 'opacity', '1');
      }
    } else {
      this.renderer.removeClass(buttonElement, 'active');

      if (contentElement) {
        this.renderer.setStyle(contentElement, 'maxHeight', '0');
        this.renderer.setStyle(contentElement, 'opacity', '0');
      }
    }
  }

  setting2Toggled() {
    this.setting2 = !this.setting2;

    const buttonElement = this.collapsibleButton2.nativeElement;
    const contentElement = this.collapsibleContent2.nativeElement;

    if (this.setting2) {
      this.renderer.addClass(buttonElement, 'active');

      if (contentElement) {
        this.renderer.setStyle(contentElement, 'maxHeight', '150px');
        this.renderer.setStyle(contentElement, 'opacity', '1');
      }
    } else {
      this.renderer.removeClass(buttonElement, 'active');

      if (contentElement) {
        this.renderer.setStyle(contentElement, 'maxHeight', '0');
        this.renderer.setStyle(contentElement, 'opacity', '0');
      }
    }
  }

  @Output() aiClicked = new EventEmitter();
  fonts: FontImageInterface[] = fontImage;

  fontSize1: number = 0;
  fontColor1: any;
  fontSize2: number = 0;
  fontColor2: any;
  selectedFont: number = 2;

  setting1: boolean = false;
  setting2: boolean = false;

  inputText: string = '';
  selectedBackgroundColor: string = '';

  ctrl: any;
  ctrl2: any;

  input1!: FormGroup;
  input2!: FormGroup;

  fontSizeForm!: FormGroup;
  fontSizeForm2!: FormGroup;

  selectedColor: string = '#3540c0';
  selectedColor2: string = '#3540c0';

  private textService = inject(TextService);
  private communicationService = inject(CommunicationService);
  private fb = inject(FormBuilder);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    // text input forms
    this.input1 = this.fb.group({
      input: ['this world is so quick to judge & too late to understand'],
    });

    this.input2 = this.fb.group({
      input: ['- saint'],
    });

    this.fontSizeForm = this.fb.group({
      fontSize: [45, Validators.min(10)],
    });

    this.fontSizeForm2 = this.fb.group({
      fontSize: [40, Validators.min(10)],
    });

    const control1 = this.input1.get('input');
    const control2 = this.input2.get('input');

    this.ctrl = this.fontSizeForm.get('fontSize');
    this.ctrl2 = this.fontSizeForm2.get('fontSize');

    this.fontSize1 = this.ctrl.value;
    this.fontSize2 = this.ctrl2.value;

    // text input 1 control that sent to canvas
    if (control1) {
      control1.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        const currentText: string = this.input1.value.input;
        this.textService.changeText(currentText);
      });
    }

    // text input 2 control that sent to canvas
    if (control2) {
      control2.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        const currentText: string = this.input2.value.input;
        this.textService.changeText2(currentText);
      });
    }

    // to get value of input 1 text
    if (this.ctrl) {
      this.ctrl.valueChanges.subscribe((value: any) => {
        this.fontSize1 = value;
        this.sendMessageToCanvas();
      });
    }

    // to get value of input 2 text
    if (this.ctrl2) {
      this.ctrl2.valueChanges.subscribe((value: any) => {
        this.fontSize2 = value;
        this.sendMessageToCanvas();
      });
    }

    this.sendMessageToCanvas();
  }

  onRangeInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (this.ctrl) {
      this.ctrl.setValue(+value);
      this.fontSize1 = +value;
    }
  }

  onRangeInput2(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (this.ctrl2) {
      this.ctrl2.setValue(+value);
      this.fontSize2 = +value;
    }
  }

  onColorChange(color: string): void {
    this.selectedColor = color;
    this.sendMessageToCanvas();
  }

  onColorChange2(color: string): void {
    this.selectedColor2 = color;
    this.sendMessageToCanvas();
  }

  aiBtnClicked(): void {
    this.aiClicked.emit();
  }

  fontSelected(index: number): void {
    // Check if the index is valid
    if (index >= 0 && index < this.fonts.length) {
      // Set the selectedFont based on the index
      this.selectedFont = index;
      // this.communicationService.sendFontSelected(this.selectedFont);
      this.sendMessageToCanvas();
    }
  }

  sendMessageToCanvas() {
    const message: Message = {
      fontSize1: this.fontSize1,
      fontColor1: this.selectedColor,
      fontSize2: this.fontSize2,
      fontColor2: this.selectedColor2,
      selectedFont: this.selectedFont,
    };
    // console.log(message);

    this.communicationService.sendMessage(message);
  }
}
