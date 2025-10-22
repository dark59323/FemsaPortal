import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Keycloak desactivado temporalmente: no tocar headers
  return next(req);
};
