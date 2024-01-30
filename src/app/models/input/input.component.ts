import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixMagicWand, radixGear } from '@ng-icons/radix-icons';
import { TextService } from '../../services/text.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  @Output() fontClicked = new EventEmitter();

  fonts: FontImageInterface[] = fontImage;
  input1!: FormGroup;

  private textService = inject(TextService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.input1 = this.fb.group({
      input: ['this world is so quick to judge & too late to understand'],
    });

    const control = this.input1.get('input');

    if (control) {
      control.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        const currentText: string = this.input1.value.input;
        this.textService.changeText(currentText);
        console.log(currentText);
      });
    }
  }

  aiBtnClicked(): void {
    this.aiClicked.emit();
  }

  fontSelected(): void {
    this.fontClicked.emit();
    console.log('🙌' + ' font clicked');
  }

}
