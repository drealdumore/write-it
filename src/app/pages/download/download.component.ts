import { Component, signal } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent {
  imageUrl$!: Observable<string>;
  imageInfo$ = this.communicationService.imageInfo$;
  url = signal('');
  data: any

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.imageInfo$ = this.communicationService.imageInfo$;
    console.log(this.imageInfo$);

    this.data = this.communicationService.getData()
    console.log(this.data);
    
  }

  downloadImage() {
    this.imageUrl$.subscribe((url) => {
      window.open(url, '_blank');
      this.url.set('url');
    });
  }
}
