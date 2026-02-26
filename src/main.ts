// Blueprint bootstrap file for Angular 19 standalone application.
// Convert this to real bootstrapApplication() call after creating Angular CLI workspace.

export const bootstrapHint = `
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
`;
