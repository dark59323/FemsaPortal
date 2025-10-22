import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen grid grid-rows-[auto_1fr]">
      <!-- Header -->
      <header class="h-14 px-4 flex items-center justify-between border-b bg-white">
        <div class="font-bold">FEMSA • App</div>
        <nav class="flex items-center gap-4 text-sm">
          <a routerLink="" class="hover:underline">Inicio</a>
        </nav>
      </header>

      <div class="grid grid-cols-[220px_1fr]">
        <!-- Sidebar -->
        <aside class="hidden md:block border-r bg-gray-50">
          <ul class="p-3 space-y-1 text-sm">
            <li><a routerLink="" class="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</a></li>
          </ul>
        </aside>

        <!-- Contenido -->
        <main class="p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class ShellComponent {}