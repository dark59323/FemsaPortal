import { inject, Injectable } from '@angular/core';
import { ENDPOINT_REPOSITORY } from '../tokens';
import { EndpointRepository } from '../../domain/repositories/endpoint.repository';

@Injectable({ providedIn: 'root' })
export class DeleteEndpointUseCase {
  private repo = inject<EndpointRepository>(ENDPOINT_REPOSITORY);
  execute(id: string) {
    return this.repo.delete(id);
  }
}