import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideAnimations(),provideToastr(),provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorsInterceptor,loadingInterceptor])),importProvidersFrom(NgxSpinnerModule),provideRouter(routes), provideClientHydration(withEventReplay())]
};
