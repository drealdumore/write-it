import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { EMPTY, Observable, catchError, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { HotToastService } from '@ngneat/hot-toast';
import { Title } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent implements OnInit {
  private toastService = inject(HotToastService);
  private loaderService = inject(LoaderService);
  private communicationService = inject(CommunicationService);
  private titleService = inject(Title);
  private clipboardService = inject(ClipboardService);

  imageData$: Observable<{ url: string; path: string }> | undefined;
  notExist = signal(false);
  @Input() id = '';

  ngOnInit() {
    this.titleService.setTitle(`${this.id} | Write it`);
    this.loaderService.openloader();

    if (this.id) {
      this.communicationService
        .checkImageExistence(this.id)
        .pipe(
          switchMap((exists) => {
            if (exists) {
              return this.communicationService.getImageAndUrlById(this.id);
            } else {
              this.handleImageDoesNotExist();
              return EMPTY;
            }
          }),
          tap(() => this.handleLoaderClose()),
          catchError((error) => {
            console.error('Error checking image existence:', error);
            return EMPTY;
          })
        )
        .subscribe((data) => {
          this.imageData$ = of(data);
        });
    }
  }

  private handleImageDoesNotExist(): void {
    console.log('Image does not exist!');
    this.notExist.set(true);
    this.handleLoaderClose();
  }

  private handleLoaderClose(): void {
    this.loaderService.closeloader();
  }

  downloadImage(path: string) {
    console.log(path);
    this.communicationService.getImage(path).subscribe(
      (imageBlob: Blob) => {
        // saveAs(imageBlob, 'write-it.png');
        saveAs(imageBlob, 'image.png');
      },
      (error) => {
        console.error('Error downloading image:', error);
      }
    );
  }

  copyPageUrl(): void {
    const pageUrl = window.location.href;
    this.clipboardService.copyFromContent(pageUrl);
    this.toastService.show('Copied link to Clipboard');
  }
}
