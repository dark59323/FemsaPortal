// src/app/core/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from '../app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ENDPOINT_REPOSITORY } from '../application/tokens';
import { EndpointHttpRepository } from '../infrastructure/http/endpoint-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: ENDPOINT_REPOSITORY, useClass: EndpointHttpRepository },
  ],
};
