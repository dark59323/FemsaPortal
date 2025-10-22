import { CanMatchFn } from '@angular/router';

// Por ahora no autenticamos a nadie: dejamos pasar todo.
export const authGuard: CanMatchFn = () => true;
