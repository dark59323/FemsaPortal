import { inject, Injectable } from '@angular/core';
import { ENDPOINT_REPOSITORY } from '../tokens';
import { EndpointRepository } from '../../domain/repositories/endpoint.repository';
import { Endpoint } from '../../domain/models/endpoint.model';

@Injectable({ providedIn: 'root' })
export class CreateEndpointUseCase {
  private repo = inject<EndpointRepository>(ENDPOINT_REPOSITORY);
  execute(payload: Omit<Endpoint, 'id' | 'createdAt'>) {
    return this.repo.create(payload);
  }
}
