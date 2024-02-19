import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.closeloader();
  }
}
