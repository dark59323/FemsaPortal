import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

type IconKey = 'menu'|'globe'|'mail'|'bell'|'settings'|'share'|'user'|'chevron';
type MenuItem = { label: string; route: string; icon: Exclude<IconKey,'menu'|'user'|'chevron'> };

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-dvh grid grid-rows-[56px_1fr] bg-[#f1f2f3] text-gray-900">
      <!-- HEADER -->
      <header class="h-14 px-4 flex items-center gap-3 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <button
          class="size-9 grid place-items-center rounded-xl hover:bg-gray-100 active:scale-95 transition"
          (click)="isMobile() ? drawerOpen.set(true) : toggleCollapsed()"
          aria-label="Alternar menú">
          <span class="size-5" [innerHTML]="icon('menu')"></span>
        </button>
        <div class="font-semibold tracking-wide">FEMSA • Portal</div>
        <div class="ml-auto flex items-center gap-3">
          <button class="hidden md:inline-flex items-center gap-2 px-3 h-9 rounded-xl hover:bg-gray-100">
            <span class="size-5" [innerHTML]="icon('bell')"></span>
            <span class="text-sm">Notificaciones</span>
          </button>
          <div class="size-9 md:size-10 rounded-full bg-brand-700 text-white grid place-items-center font-bold">D</div>
        </div>
      </header>

      <!-- LAYOUT -->
      <div class="grid grid-cols-1 md:grid-cols-[var(--sbw)_1fr] min-h-0">
        <!-- SIDEBAR (desktop) -->
        <aside
          class="relative hidden md:flex h-full text-gray-100 will-change-[width] transition-[width] duration-300"
          [ngStyle]="{'--sbw': collapsed() ? '78px' : '260px'}">

          <!-- CAPA DE COLOR que se anima y pinta todo el bloque -->
          <div class="absolute inset-y-0 left-0 transition-[width] duration-300"
               [style.width]="collapsed() ? '78px' : '260px'"
               [class]="sidebarBg">
          </div>

          <!-- Contenido por encima de la capa de color -->
          <div class="relative z-10 flex flex-col justify-between w-full">
            <div class="py-2">
              <nav class="mt-1 text-sm">
                <a *ngFor="let m of menu"
                   [routerLink]="m.route"
                   routerLinkActive="bg-black/15"
                   [routerLinkActiveOptions]="{ exact: m.route === '/home' }"
                   class="group relative flex items-center gap-3 px-4 py-3 rounded-xl mx-2 my-1 hover:bg-black/10 transition"
                   [attr.title]="collapsed() ? m.label : null">
                  <span class="inline-block size-5 opacity-95" [innerHTML]="icon(m.icon)"></span>
                  <span class="uppercase tracking-wide font-extrabold text-[15px] opacity-90 whitespace-nowrap"
                        *ngIf="!collapsed()">{{ m.label }}</span>
                  <span routerLinkActive="opacity-100"
                        class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-l-full bg-white/80 opacity-0 transition"></span>
                </a>
              </nav>
            </div>

            <div class="p-3">
              <div class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/10">
                <div class="size-8 rounded-full bg-white/20 grid place-items-center">
                  <span class="inline-block size-5" [innerHTML]="icon('user')"></span>
                </div>
                <div class="font-bold tracking-wide text-lg" *ngIf="!collapsed()">DANNY</div>
              </div>
              <button
                class="w-full mt-2 flex items-center justify-center gap-2 h-9 rounded-lg bg-black/10 hover:bg-black/15 transition"
                (click)="toggleCollapsed()">
                <span class="size-4" [class.rotate-180]="collapsed()" [innerHTML]="icon('chevron')"></span>
                <span class="text-xs font-semibold" *ngIf="!collapsed()">Colapsar</span>
              </button>
            </div>
          </div>
        </aside>

        <!-- DRAWER (móvil) con overlay del MISMO color -->
        <div class="md:hidden fixed inset-0 z-40" *ngIf="drawerOpen()">
          <!-- Overlay vino completo -->
          <div class="absolute inset-0" [class]="sidebarBg" (click)="drawerOpen.set(false)"></div>

          <!-- Panel -->
          <!-- SIDEBAR (desktop) -->
<aside
  class="relative hidden md:flex h-full text-gray-100 will-change-[width] transition-[width] duration-300 overflow-hidden"
  [ngStyle]="{'--sbw': collapsed() ? '78px' : '260px'}">

  <!-- CAPA DE COLOR que pinta todo -->
  <div class="absolute inset-y-0 left-0 transition-[width] duration-300"
       [style.width]="collapsed() ? '78px' : '260px'"
       [class]="sidebarBg">
  </div>

  <!-- ⬇️ Contenido con el MISMO ancho animado que la capa -->
  <div class="relative z-10 flex flex-col justify-between transition-[width] duration-300"
       [style.width]="collapsed() ? '78px' : '260px'">

    <div class="py-2">
      <nav class="mt-1 text-sm">
        <a *ngFor="let m of menu"
           [routerLink]="m.route"
           routerLinkActive="bg-black/15"
           [routerLinkActiveOptions]="{ exact: m.route === '/home' }"
           class="group relative flex items-center gap-3 px-4 py-3 rounded-xl mx-2 my-1 hover:bg-black/10 transition"
           [attr.title]="collapsed() ? m.label : null">
          <span class="inline-block size-5 opacity-95" [innerHTML]="icon(m.icon)"></span>
          <span class="uppercase tracking-wide font-extrabold text-[15px] opacity-90 whitespace-nowrap"
                *ngIf="!collapsed()">{{ m.label }}</span>

          <!-- indicador activo -->
          <span routerLinkActive="opacity-100"
                class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-l-full bg-white/80 opacity-0 transition">
          </span>
        </a>
      </nav>
    </div>

    <div class="p-3">
      <div class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/10">
        <div class="size-8 rounded-full bg-white/20 grid place-items-center">
          <span class="inline-block size-5" [innerHTML]="icon('user')"></span>
        </div>
        <div class="font-bold tracking-wide text-lg" *ngIf="!collapsed()">DANNY</div>
      </div>

      <button
        class="w-full mt-2 flex items-center justify-center gap-2 h-9 rounded-lg bg-black/10 hover:bg-black/15 transition"
        (click)="toggleCollapsed()">
        <span class="size-4" [class.rotate-180]="collapsed()" [innerHTML]="icon('chevron')"></span>
        <span class="text-xs font-semibold" *ngIf="!collapsed()">Colapsar</span>
      </button>
    </div>

  </div>
</aside>

        </div>

        <!-- MAIN -->
        <main class="p-6 md:p-10 overflow-auto">
          <section class="rounded-2xl bg-white shadow-sm border p-8 md:p-12">
            <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Bienvenido Danny al<br class="hidden md:block"/> portal de FEMSA
              </span>
            </h1>
            <p class="mt-4 text-gray-600 max-w-2xl">
              Este es tu panel de inicio. Usa el menú lateral para navegar entre funcionalidades.
            </p>
          </section>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host { --sbw: 260px; }
  `]
})
export class HomeComponent {
  // si no tienes esta clase en Tailwind, usa: 'bg-[#6e2029]'
  sidebarBg = 'bg-brand-700';

  menu: MenuItem[] = [
    { label: 'INICIO', route: '/home',  icon: 'globe'    },
    { label: 'FUNC 1', route: '/func1', icon: 'mail'     },
    { label: 'FUNC 2', route: '/func2', icon: 'bell'     },
    { label: 'FUNC 3', route: '/func3', icon: 'settings' },
    { label: 'FUNC 4', route: '/func4', icon: 'share'    },
  ];

  collapsed = signal<boolean>(this.readCollapsed());
  drawerOpen = signal(false);

  constructor() {
    effect(() => localStorage.setItem('sb-collapsed', JSON.stringify(this.collapsed())));
  }
  isMobile() { return typeof window !== 'undefined' && window.innerWidth < 768; }
  toggleCollapsed() { this.collapsed.update(v => !v); }
  private readCollapsed() { try { return JSON.parse(localStorage.getItem('sb-collapsed') ?? 'false'); } catch { return false; } }

  icon(kind: IconKey): string {
    const base = 'stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    const wrap = (d: string, vb='0 0 24 24') => `<svg viewBox="${vb}" ${base} xmlns="http://www.w3.org/2000/svg">${d}</svg>`;
    switch (kind) {
      case 'menu': return wrap('<path d="M4 6h16M4 12h16M4 18h16"/>');
      case 'globe': return wrap('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z"/>');
      case 'mail': return wrap('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>');
      case 'bell': return wrap('<path d="M6 8a6 6 0 1 1 12 0c0 7 3 5 3 8H3c0-3 3-1 3-8"/><path d="M10 21h4"/>');
      case 'settings': return wrap('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15 1.65 1.65 0 0 0 3.09 14H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.3l.06.06A1.65 1.65 0 0 0 8.92 4h.09a1.65 1.65 0 0 0 1-1.51V2a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.37.5.6 1.12.6 1.8s-.23 1.3-.6 1.8z"/>');
      case 'share': return wrap('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51 8.59 10.49"/>');
      case 'user': return wrap('<path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/>');
      case 'chevron': return wrap('<path d="m15 18-6-6 6-6"/>');
    }
  }
}
