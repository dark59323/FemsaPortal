import { InjectionToken } from '@angular/core';
import { EndpointRepository } from '../domain/repositories/endpoint.repository';

export const ENDPOINT_REPOSITORY = new InjectionToken<EndpointRepository>('ENDPOINT_REPOSITORY');