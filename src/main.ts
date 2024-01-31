import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      [
        {
          path: '',
          title: 'Quillify',
          loadComponent: () =>
            import('./app/pages/home/home.component').then(
              (c) => c.HomeComponent
            ),
        },
        {
          path: 'app',
          title: 'App',
          loadComponent: () =>
            import('./app/pages/main/main.component').then(
              (c) => c.MainComponent
            ),
        },
        {
          path: 'canvas',
          title: 'Canvas',
          loadComponent: () =>
            import('./app/models/canvas/canvas.component').then(
              (c) => c.CanvasComponent
            ),
        },

        {
          path: '',
          redirectTo: '/app',
          pathMatch: 'full',
        },
      ],
      withComponentInputBinding()
    ),
  ],
}).catch((err) => console.error(err));
