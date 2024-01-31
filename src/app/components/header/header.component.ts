import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'header-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  showButton: boolean = true;

  ngOnInit(): void {
    console.log('initialize');

    if (this.router.url === '/app') {
      this.showButton = false;
      console.log('button no suppose show');
    }
  }
}
