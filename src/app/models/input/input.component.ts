import { Component, EventEmitter, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixMagicWand, radixGear } from '@ng-icons/radix-icons';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [provideIcons({ radixMagicWand, radixGear })],
})
export class InputComponent {
  @Output() aiClicked = new EventEmitter();

  aiBtnClicked(): void {
    this.aiClicked.emit();
  }
}
