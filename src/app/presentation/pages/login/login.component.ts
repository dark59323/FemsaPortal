import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-dvh bg-bg-page">
      <div class="grid min-h-dvh grid-cols-1 md:grid-cols-2">
        <div
          class="hidden md:flex items-center justify-center bg-gradient-to-b from-[var(--bg-left-1)] to-[var(--bg-left-2)]"
        >
          <img
            src="assets/brand/femsa-logo.png"
            alt="FEMSA Salud Ecuador"
            class="max-w-[85%] h-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </div>
        <div class="flex items-center justify-center bg-brand-700 p-8 md:p-20">
          <div class="brand-card-2xl w-[96%] max-w-4xl p-10 md:p-16">
            <h1 class="brand-title mb-12">Iniciar sesión</h1>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-7">
              <div>
                <label for="username" class="brand-label">Usuario</label>
                <input
                  id="username"
                  type="text"
                  formControlName="username"
                  autocomplete="username"
                  class="brand-input-lg"
                  placeholder="Ingrese su usuario"
                />
                <p
                  *ngIf="submitted() && form.controls.username.invalid"
                  class="mt-2 text-sm text-gray-600"
                >
                  Ingresa un usuario válido (mínimo 3 caracteres).
                </p>
              </div>
              <div>
                <label for="password" class="brand-label">Contraseña</label>
                <div class="relative">
                  <input
                    id="password"
                    [type]="showPassword() ? 'text' : 'password'"
                    formControlName="password"
                    autocomplete="current-password"
                    class="brand-input-lg pr-12"
                    placeholder="Ingrese su contraseña"
                  />
                  <button
                    type="button"
                    (click)="togglePassword()"
                    class="absolute inset-y-0 right-4 my-auto text-[var(--brand-700)]/80 hover:opacity-90"
                    aria-label="Mostrar/ocultar contraseña"
                  >
                    {{ showPassword() ? '🙈' : '👁️' }}
                  </button>
                </div>
                <p
                  *ngIf="submitted() && form.controls.password.invalid"
                  class="mt-2 text-sm text-gray-600"
                >
                  La contraseña es obligatoria (mínimo 6 caracteres).
                </p>
              </div>
              <button
                type="submit"
                [disabled]="loading()"
                class="brand-btn-primary text-lg md:text-xl"
              >
                {{ loading() ? 'Autenticando…' : 'Iniciar sesión' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  constructor(private router: Router) {}
  private fb = new FormBuilder();

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  private _submitted = signal(false);
  submitted = computed(() => this._submitted());
  loading = signal(false);
  showPassword = signal(false);
  error = '';

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  async onSubmit() {
    this._submitted.set(true);
    if (this.form.invalid) return;

    this.loading.set(true);
    await new Promise((r) => setTimeout(r, 800));
    this.loading.set(false);

    console.log('Credenciales:', this.form.value);
    this.router.navigate(['/home']);
  }
}
