import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen grid md:grid-cols-2">
      <!-- Panel Izquierdo (Logo) -->
      <div class="hidden md:flex items-center justify-center bg-gray-100 p-8">
        <img
          src="assets/femsa-logo.png"
          alt="FEMSA Salud Ecuador"
          class="max-w-[80%] h-auto object-contain"
        />
      </div>

      <!-- Panel Derecho (Formulario) -->
      <div class="flex items-center justify-center bg-[#742a2e] p-6 md:p-10">
        <div class="w-full max-w-md">
          <h1 class="text-white text-3xl md:text-4xl font-extrabold tracking-wide mb-8">
            INICIAR SESIÓN
          </h1>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Usuario -->
            <div>
              <label for="username" class="block text-white/90 font-semibold mb-2">Usuario</label>
              <input
                id="username"
                type="text"
                formControlName="username"
                autocomplete="username"
                class="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/60"
                placeholder="Ingrese su usuario"
              />
              <p *ngIf="submitted() && form.controls.username.invalid"
                 class="mt-2 text-sm text-yellow-200">
                Ingresa un usuario válido.
              </p>
            </div>

            <!-- Contraseña -->
            <div>
              <label for="password" class="block text-white/90 font-semibold mb-2">Contraseña</label>
              <div class="relative">
                <input
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  autocomplete="current-password"
                  class="w-full rounded-lg border border-black/10 bg-white px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/60"
                  placeholder="Ingrese su contraseña"
                />
                <button type="button"
                        (click)="togglePassword()"
                        class="absolute inset-y-0 right-3 my-auto text-gray-600 hover:text-black"
                        aria-label="Mostrar/ocultar contraseña">
                  {{ showPassword() ? '🙈' : '👁️' }}
                </button>
              </div>
              <p *ngIf="submitted() && form.controls.password.invalid"
                 class="mt-2 text-sm text-yellow-200">
                La contraseña es obligatoria (mínimo 6 caracteres).
              </p>
            </div>

            <!-- Acción -->
            <button
              type="submit"
              [disabled]="loading()"
              class="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition-all hover:bg-black/90 disabled:opacity-60"
            >
              {{ loading() ? 'Autenticando…' : 'INICIAR SESIÓN' }}
            </button>

            <!-- Opcional: enlaces auxiliares -->
            <div class="flex items-center justify-between text-sm">
              <label class="inline-flex items-center gap-2 text-white/80">
                <input type="checkbox" class="size-4 rounded border-white/30 bg-transparent" />
                Recordarme
              </label>
              <a class="text-white/90 hover:underline" href="#">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = new FormBuilder();

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  private _submitted = signal(false);
  submitted = computed(() => this._submitted());
  loading = signal(false);
  showPassword = signal(false);

  togglePassword() { this.showPassword.update(v => !v); }

  async onSubmit() {
    this._submitted.set(true);
    if (this.form.invalid) return;
    this.loading.set(true);
    // Aquí llamas a tu servicio/auth (Keycloak o backend)
    // Simulación:
    await new Promise(r => setTimeout(r, 800));
    this.loading.set(false);
    // TODO: Navegar a /home o /dashboard
    // this.router.navigateByUrl('/home');
    console.log('Credenciales:', this.form.value);
  }
}
