import { NgxSpinnerConfig } from './../../node_modules/ngx-spinner/lib/config.d';
import { errorsInterceptor } from './Core/interceptors/Errors/errors.interceptor';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './Core/interceptors/Headers/header.interceptor';
import { error } from 'console';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './Core/interceptors/Loading/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })), provideClientHydration(withEventReplay()),
   provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorsInterceptor,loadingInterceptor])), 
   provideAnimations(),
   provideAnimations(), // required animations providers
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule)
  ]
};


