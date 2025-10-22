import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { EndpointRepository } from '../../domain/repositories/endpoint.repository';
import { Endpoint } from '../../domain/models/endpoint.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EndpointHttpRepository implements EndpointRepository {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl ?? 'http://localhost:3000/api'}/endpoints`;

  async list(): Promise<Endpoint[]> {
    return await firstValueFrom(this.http.get<Endpoint[]>(this.base));
  }

  async create(payload: Omit<Endpoint, 'id' | 'createdAt'>): Promise<Endpoint> {
    return await firstValueFrom(this.http.post<Endpoint>(this.base, payload));
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.base}/${id}`, { responseType: 'text' }));
  }
}
