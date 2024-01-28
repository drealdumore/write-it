import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixDownload } from '@ng-icons/radix-icons';


@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  viewProviders: [provideIcons({ radixDownload })],

})
export class PreviewComponent {

}
