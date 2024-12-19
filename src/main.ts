import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// // Check if the environment is production and enable production mode for better performance
// if (environment.production) {
//   enableProdMode();
// }

// Bootstrap the AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));