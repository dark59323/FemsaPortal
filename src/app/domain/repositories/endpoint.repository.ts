import { Endpoint } from '../models/endpoint.model';

export interface EndpointRepository {
  list(): Promise<Endpoint[]>;
  create(payload: Omit<Endpoint, 'id' | 'createdAt'>): Promise<Endpoint>;
  delete(id: string): Promise<void>;
}