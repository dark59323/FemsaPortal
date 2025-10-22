import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/app.config';
import { ShellComponent } from './app/presentation/layout/shell.component';
import { RootComponent } from './app/presentation/layout/root.component';

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));