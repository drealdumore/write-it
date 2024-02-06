import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment.development';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireStorageModule,
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
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
          path: 'download/:id',
          loadComponent: () =>
            import('./app/pages/download/download.component').then(
              (c) => c.DownloadComponent
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
