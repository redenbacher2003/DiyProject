import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), MessageService, provideAnimations()]
};
