import { Component, Input, OnInit, inject, input, signal } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { HotToastService } from '@ngneat/hot-toast';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent implements OnInit {
  private toastService = inject(HotToastService);
  private communicationService = inject(CommunicationService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private clipboardService = inject(ClipboardService);

  imageData$: Observable<{ url: string; path: string }> | undefined;

  @Input() id = '';

  ngOnInit() {
    this.titleService.setTitle(`${this.id} | Write it`);

    this.route.params.forEach(() => {
      if (this.id) {
        this.imageData$ = this.communicationService
          .getImageAndUrlById(this.id)
          .pipe(
            catchError(() => {
              return EMPTY;
            })
          );
      }
    });
  }

  downloadImage(imageUrl: string): void {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `write-it.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  copyPageUrl(): void {
    const pageUrl = window.location.href;
    this.clipboardService.copyFromContent(pageUrl);
    this.toastService.show('Copied link to Clipboard');
  }
}
