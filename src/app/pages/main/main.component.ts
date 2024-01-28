import { Component } from '@angular/core';
import { InputComponent } from '../../models/input/input.component';
import { PreviewComponent } from '../../models/preview/preview.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [InputComponent, PreviewComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
