export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Endpoint {
  id: string;
  name: string;
  url: string;
  method: HttpMethod;
  active: boolean;
  createdAt?: string;
}
